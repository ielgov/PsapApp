package com.ibm.psap.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.ibm.psap.util.Constants;


import org.json.JSONArray;
import org.json.JSONException;

/**
 * Servlet implementation class Categories
 */
@WebServlet("/Categories")
public class Categories extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(Categories.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Categories() {
        super();
        // TODO Auto-generated constructor stub
       
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String categorytype = request.getParameter("type");
		String parentId = request.getParameter("parentId");
		JSONObject jsonResponse =  null;
		boolean productionMode =(Boolean)getServletContext().getAttribute("productionMode");
		 
		logger.info("The requested type is "+categorytype);
		if (categorytype!= null){
			
			int switchValue = 0;
			if(categorytype.equalsIgnoreCase("CATEGORY"))
				switchValue = 1;
			else if(categorytype.equalsIgnoreCase("SOLUTION"))
				switchValue = 2;
			else if(categorytype.equalsIgnoreCase("OFFERING"))
				switchValue = 3;
			
			switch (switchValue){
				case 1:
					if (productionMode){
						//extarct from the data set
						jsonResponse = getJSONResponse("Category", parentId);
					}else{
						//stub
						//jsonString = Constants.CATEGORY_JSONSTR;
						jsonResponse = getJSONResponse("Category", parentId);						
					}
					break;
				case 2:
					if (productionMode){
						//extarct from the data set
						jsonResponse = doGetDB(request);
					}else{
						//stub
						//jsonString = Constants.SOLUTION_JSONSTR;
						jsonResponse = getJSONResponse("Solution", parentId);				
					}
					break;
				case 3:
					if (productionMode){
						//extarct from the data set
						jsonResponse = doGetDB(request);
					}else{
						//stub
						//jsonString = Constants.OFFERING_JSONSTR;
						jsonResponse = getJSONResponse("Offering", parentId);
					}
					break;	
				default:
					break;
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
		doGet(request, response);
	}
	
	
	
	public JSONObject doGetDB(HttpServletRequest request) throws IOException{
		String categorytype = request.getParameter("type");
		String parentId = request.getParameter("parentId");
		JSONObject jsonResponse =  null;
		logger.info("The requested type is "+categorytype + " action is search" );
		if (categorytype!= null){
			try {
					//if not asset search
					jsonResponse = getDBResultSetAsJson(categorytype, Constants.GET_CategoryRecord, parentId);								
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new IOException(e.getMessage());
			}						
		}
		logger.info("Returning the response to request type "+categorytype);
		return jsonResponse;
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
				jsonResponse = convertDBToJSONArray(rs);
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
	
	
	protected JSONObject getJSONResponse(String type, String parentid) throws IOException {
		logger.info("Retriving JSON for the type "+type);
		JSONObject obj = (JSONObject)getServletContext().getAttribute(type);
		//logger.info(obj.toString());
		logger.info("Retriving JSON for the type "+type + " for parent id " + parentid);
		JSONObject Responseobj =  new JSONObject();
		try {
			JSONArray objArray = (JSONArray) obj.getJSONArray(parentid);
			//logger.info(objArray.toString());
			Responseobj =  new JSONObject();
			Responseobj.put("result", objArray);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			//throw new IOException(e.getMessage());
			//JSONObject not found...no result found
			logger.info("No data found");
			Responseobj =  new JSONObject();
			JSONArray objArray =  new JSONArray();
			try {
				Responseobj.put("result", objArray);
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				throw new IOException (e1.getMessage());
			}
		}			
		return Responseobj;
	}
	
	/**
     * Convert a result set into a JSON Array
     * @param resultSet
     * @return a JSONObject
     * @throws Exception
     */
    public  JSONObject convertDBToJSONArray(ResultSet resultSet)
            throws Exception {
    	Properties mapprop = (Properties)getServletContext().getAttribute("MapFile");
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObj = new JSONObject();
        String colname =  null;
        String newcolname = null;
        logger.info("Creating a JSON response for the DB resultset");
        try{
        	do {
	        	//logger.info("Getting Column Count for the record.");
	            int total_cols = resultSet.getMetaData().getColumnCount();
	            //logger.info("Column Count is " + total_cols);
	            JSONObject obj = new JSONObject();
	           
	            for (int i = 0; i < total_cols; i++) {
	            	colname = resultSet.getMetaData().getColumnLabel(i + 1);
	            	newcolname = mapprop.getProperty(colname);
	            	//logger.info("DB Colname=" + colname + " PropFile colname=" + newcolname);
	            	if ( newcolname != null)
	            		obj.put(newcolname
	                        .toLowerCase(), resultSet.getObject(i + 1));
	            	else
	            		obj.put(colname
		                        .toLowerCase(), resultSet.getObject(i + 1));
	        
	            }
	            jsonArray.put(obj);
        	}while(resultSet.next());
        }catch(Exception exp){
        	exp.printStackTrace();
        }
        jsonObj.put("result", jsonArray);
        return jsonObj;
    }
}

	
