package com.ibm.psap.servlet;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
 * Servlet implementation class dbCategories
 */
@WebServlet("/dbCategories")
public class dbCategories extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(dbCategories.class);   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public dbCategories() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String categorytype = request.getParameter("type");
		String parentId = request.getParameter("parentid");
		String action = request.getParameter("action");
		JSONObject jsonResponse =  null;
		logger.info("The requested type is "+categorytype + " action is " + action);
		if (categorytype!= null){
			try {
				if (categorytype.equalsIgnoreCase("ASSET")){
					//if asset search
					jsonResponse = getDBResultSetAsJson(categorytype, Constants.GET_AssetRecordForOffering, parentId);
				}else{
					//if not asset search
					jsonResponse = getDBResultSetAsJson(categorytype, Constants.GET_CategoryRecord, parentId);								
				}
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new IOException(e.getMessage());
			}						
		}
		logger.info("Returning the response to request type "+categorytype);
		logger.info("Response to request is "+jsonResponse.toString());
		response.setContentType("application/json");
		response.getWriter().write(jsonResponse.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String categorytype = request.getParameter("type");
		String itemid = request.getParameter("itemid");
		String action = request.getParameter("action");
		String displayname = request.getParameter("displayname");
		String description = request.getParameter("description");
		String parentId = request.getParameter("parentid");
		String sql = null;
		logger.info("The requested type is "+categorytype + " action is " + action);
		if (categorytype!= null){
			try {
				if (action.equalsIgnoreCase("add")){
					sql = Constants.Set_CategoryRecord;
					setCategoryToDB(categorytype, sql, 
							displayname, description, parentId);
				}else if (action.equalsIgnoreCase("modify")){
					sql = Constants.Modify_CategoryRecord;
					updateCategoryToDB(categorytype, sql, 
							displayname, description, itemid);
				}else if (action.equalsIgnoreCase("delete")){
					sql = Constants.Delete_CategoryRecord;
					deleteCategoryToDB(categorytype, sql, 
							displayname, description, itemid);
				}
						
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new IOException(e.getMessage());
			}						
		}
		logger.info("Success: " + action + " an item for "+categorytype);
	}
	
	
	protected JSONObject getDBResultSetAsJson(String categorytype, String sql, String parentid) throws Exception{
		logger.info("Retrieving information from the database for the type "+categorytype);
		ResultSet rs = null;
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		PreparedStatement ps = null;
		JSONObject jsonResponse =  null;
		try {
			
			ps = con.prepareStatement(sql);
			ps.setInt(1, Integer.parseInt(parentid));
			rs = ps.executeQuery();
		
			if(rs.next()){
				logger.info("Retrieved information from the database for the type "+categorytype);
				jsonResponse = DBResultSetToJson.convertToJSONArray(rs);
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
	
	protected void setCategoryToDB(String categorytype, String sql, 
			String displayname, String description, String parentid) throws Exception{
		logger.info("Setting information to the database for the type "+categorytype);
		
		CallableStatement cs = null;
	
		try {
			Connection con = (Connection) getServletContext().getAttribute("DBConnection");
			logger.info("Preparing SQL "+sql);
			cs = con.prepareCall(sql);
			cs.setString(1, displayname);
			cs.setString(2, description);
			cs.setInt(3, Integer.parseInt(parentid));
			
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
	
	protected void updateCategoryToDB(String categorytype, String sql, String displayname, 
			String description, String itemid) throws Exception{
		logger.info("Updating information to the database for the type "+categorytype);
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		PreparedStatement ps = null;
	
		try {
			
			ps = con.prepareStatement(sql);
			ps.setString(1, displayname);
			ps.setString(2, description);
			ps.setInt(3, Integer.parseInt(itemid));
			int result = ps.executeUpdate();
		
			if(result > 0){
				logger.info("Updated the database for the type "+categorytype);
			}else{
				logger.info("No records found for the type "+categorytype);
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());
			throw new Exception("DB problem.");
		}finally{
			try {
				ps.close();
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}		
		
	}
	
	
	protected void deleteCategoryToDB(String categorytype, String sql, 
			String displayname, String description, String itemid) throws Exception{
		logger.info("Setting information to the database for the type "+categorytype);
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
