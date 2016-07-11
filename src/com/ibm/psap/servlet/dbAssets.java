package com.ibm.psap.servlet;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.ibm.psap.util.Constants;
import com.ibm.psap.util.DBResultSetToJson;

/**
 * Servlet implementation class dbAssets
 */
@WebServlet("/dbAssets")
public class dbAssets extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(dbAssets.class);   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public dbAssets() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String submittedBy = request.getParameter("SubmittedBy");
		String action = request.getParameter("action");
		JSONObject jsonResponse =  null;
		logger.info("The requested type is Asset and  action is " + action);
		if (submittedBy!= null){
			try {
				jsonResponse = getDBResultSetAsJson("Asset", Constants.GET_AssetRecord, submittedBy);				
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new IOException(e.getMessage());
			}						
		}
		logger.info("Returning the response to request type Asset");
		logger.info("Response to request is "+jsonResponse.toString());
		response.setContentType("application/json");
		response.getWriter().write(jsonResponse.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String AssetID = request.getParameter("AssetID");
		String AssetDisplayName = request.getParameter("AssetDisplayName");
		String AssetDisplayDescription = request.getParameter("AssetDisplayDescription");
		String URL = request.getParameter("URL");
		String ActionType = request.getParameter("ActionType");
		String AssetType = request.getParameter("AssetType");
		String SourceType = request.getParameter("SourceType");
		String AssetGroupingText = request.getParameter("AssetGroupingText");
		String SubmittedBy = request.getParameter("SubmittedBy");
		String Status = request.getParameter("Status");
		String AdminComments = request.getParameter("AdminComments");
		String OfferingID =request.getParameter("OfferingID");
		String action = request.getParameter("action");
		String sql = null;
		logger.info("The requested type is Asset and action is " + action);
		if (action!= null){
			try {
				if (action.equalsIgnoreCase("add")){
					sql = Constants.Set_AssetRecord;
					int assetid = setAssetToDB(sql, 
							AssetDisplayName, AssetDisplayDescription, URL,
							ActionType, AssetType, SourceType,
							AssetGroupingText, SubmittedBy, Status,
							AdminComments, OfferingID);
					logger.info("Returning asset id " + assetid);
					JSONObject addAssetResp =  new JSONObject();
					addAssetResp.put("assetid", assetid);
					JSONObject jsonResponse =  new JSONObject();
					jsonResponse.put("result", addAssetResp);
					response.setContentType("application/json");
					response.getWriter().write(jsonResponse.toString());
					logger.info("Success: " + action + " an Asset item");
				}else if (action.equalsIgnoreCase("modify")){
					sql = Constants.Modify_AssetRecord;
					UpdateAssetToDB(sql, 
							AssetDisplayName, AssetDisplayDescription, URL,
							ActionType, AssetType, SourceType,
							AssetGroupingText, SubmittedBy, Status,
							AdminComments, AssetID);
					logger.info("Success: " + action + " an Asset item");
				}else if (action.equalsIgnoreCase("delete")){
					sql = Constants.Delete_AssetRecord;
					deleteAssetToDB(sql, AssetID);
					logger.info("Success: " + action + " an Asset item");
				}
						
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new IOException(e.getMessage());
			}						
		}
		
	}
	
	
	protected JSONObject getDBResultSetAsJson(String categorytype, String sql, String filter) throws Exception{
		logger.info("Retrieving information from the database for the type "+categorytype + " & filter is" + filter);
		ResultSet rs = null;
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		PreparedStatement ps = null;
		JSONObject jsonResponse =  null;
		try {
			
			ps = con.prepareStatement(sql);
			ps.setString(1, filter);
			rs = ps.executeQuery();
		
			if(rs.next()){
				logger.info("Retrieved information from the database for the type "+categorytype);
				jsonResponse = DBResultSetToJson.convertToAssetJSONArray(rs);
			}else{
				logger.info("No records found for the type "+categorytype);
				
				JSONArray jsonArray = new JSONArray(); //empty array
				jsonResponse = new JSONObject();
				jsonResponse.put("result", jsonArray);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());
			throw new Exception("DB problem.");
		}finally{
			try {
				rs.close();
				ps.close();
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}		
		return jsonResponse;
	}
	
	protected int setAssetToDB(String sql, 
			String AssetDisplayName, String AssetDisplayDescription, String URL,
			String ActionType, String AssetType, String SourceType,
			String AssetGroupingText, String SubmittedBy, String Status,
			String AdminComments, String OfferingIDs) throws Exception{
		int index = 0;
		logger.info("Setting information to the database for the type Asset");
		logger.info("Received offering string is "+ OfferingIDs);
		StringTokenizer offeringIDTokens =  new StringTokenizer(OfferingIDs,",");
		String OfferingID = null;	     
		CallableStatement cs = null;
		PreparedStatement ps = null;
		int assetID = 0;
		try {
			Connection con = (Connection) getServletContext().getAttribute("DBConnection");
			while (offeringIDTokens.hasMoreTokens()) {
				OfferingID = offeringIDTokens.nextToken();
				logger.info("Offering ID  is " + OfferingID);
				if (index == 0){
					logger.info("Adding a Asset & its realtionship");
					logger.info("Preparing SQL "+sql);
					cs = con.prepareCall(sql);
					cs.setString(1, AssetDisplayName);
					cs.setString(2, AssetDisplayDescription);
					cs.setString(3, URL);
					cs.setString(4, ActionType);
					cs.setString(5, AssetType);
					cs.setString(6, SourceType);
					cs.setString(7, AssetGroupingText);
					cs.setString(8, SubmittedBy);
					cs.setString(9, Status);
					cs.setString(10, AdminComments);
					cs.setInt(11, Integer.parseInt(OfferingID));
					cs.registerOutParameter(12, java.sql.Types.INTEGER);
					cs. executeUpdate();
					assetID = cs.getInt(12);
					logger.info("The Asset inserted is " +  assetID);
				}else{
					logger.info(" Adding asset relationship");
					ps = con.prepareStatement(Constants.set_AssetRelation);
					ps.setInt(1, assetID);
					ps.setInt(2, Integer.parseInt(OfferingID));
					ps.executeUpdate();
					logger.info("Successfully inserted the record to the asset relationship table");
				}
				index++;
			}	
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());
			throw new Exception("DB problem.");
		}finally{
			try {
				if (cs != null)
				cs.close();
				if (ps != null)
					ps.close();
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}
		return assetID;
	}
	
	protected void UpdateAssetToDB(String sql, 
			String AssetDisplayName, String AssetDisplayDescription, String URL,
			String ActionType, String AssetType, String SourceType,
			String AssetGroupingText, String SubmittedBy, String Status,
			String AdminComments, String AssetID) throws Exception{
		logger.info("Updating information to the database for the type Asset");
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		CallableStatement cs = null;
	
		try {
			
			cs = con.prepareCall(sql);
			cs.setString(1, AssetDisplayName);
			AssetDisplayDescription=AssetDisplayDescription.replaceAll("&", "[amp;]");
			cs.setString(2, AssetDisplayDescription);
			cs.setString(3, URL);
			cs.setString(4, ActionType);
			cs.setString(5, AssetType);
			cs.setString(6, SourceType);
			cs.setString(7, AssetGroupingText);
			cs.setString(8, SubmittedBy);
			cs.setString(9, Status);
			cs.setString(10, AdminComments);
			cs.setInt(11, Integer.parseInt(AssetID));
			int result = cs.executeUpdate();
		
			if(result > 0){
				logger.info("Updated the database for the type Asset");
			}else{
				logger.info("No records found for the type Asset");
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());
			throw new Exception("DB problem.");
		}finally{
			try {
				cs.close();
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}		
		
	}
	
	
	protected void deleteAssetToDB(String sql, 
			String itemid) throws Exception{
		logger.info("Setting information to the database for the type Asset");
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		CallableStatement cs = null;
	
		try {
			cs = con.prepareCall(sql);
			cs.setInt(1, Integer.parseInt(itemid));
			
			cs.executeUpdate();
		
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());
			throw new Exception("DB problem.");
		}finally{
			try {
				cs.close();
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}		
	}
}
