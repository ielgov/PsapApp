package com.ibm.psap.util;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;


import java.sql.ResultSet;  

public final class DBResultSetToJson {
	static Logger logger = Logger.getLogger(DBResultSetToJson.class); 
	/**
     * Convert a result set into a JSON Array
     * @param resultSet
     * @return a JSONObject
     * @throws Exception
     */
    public static JSONObject convertToJSONArray(ResultSet resultSet)
            throws Exception {
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObj = new JSONObject();
        logger.info("Creating a JSON response for the DB resultset");
        try{
        	do {
	        	//logger.info("Getting Column Count for the record.");
	            int total_cols = resultSet.getMetaData().getColumnCount();
	            //logger.info("Column Count is " + total_cols);
	            JSONObject obj = new JSONObject();
	           
	            for (int i = 0; i < total_cols; i++) {
	                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
	                        .toLowerCase(), resultSet.getObject(i + 1));
	                //logger.info("The column value is " + obj);
	            }
	            jsonArray.put(obj);
        	}while(resultSet.next());
        }catch(Exception exp){
        	exp.printStackTrace();
        }
        jsonObj.put("result", jsonArray);
        return jsonObj;
    }
    
    /**
     * Convert a result set into a JSON Object
     * @param resultSet
     * @return a JSONObject
     * @throws Exception
     */
    public static JSONObject convertToJSONObject(ResultSet resultSet)
            throws Exception {
    	JSONObject obj = new JSONObject();
        while (resultSet.next()) {
            int total_cols = resultSet.getMetaData().getColumnCount();
           
            for (int i = 0; i < total_cols; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
                        .toLowerCase(), resultSet.getObject(i + 1));                
            }
        }
        return obj;
    }
    
    /**
     * Convert a result set into a Asset JSON Array
     * @param resultSet
     * @return a JSONObject
     * @throws Exception
     */
    public static JSONObject convertToAssetJSONArray(ResultSet resultSet)
            throws Exception {
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObj = new JSONObject();
        
        JSONObject assetobj = new JSONObject();
        JSONObject assetDetailobj = new JSONObject();
        JSONObject assetParentobj = new JSONObject();
        JSONArray assetParentArray = new JSONArray();
        
        int jsonIndex = 0;
        String colname = null;
        logger.info("Creating a JSON response for the DB resultset");
        try{
        	do {
	        	//logger.info("Getting Column Count for the record.");
	            int total_cols = resultSet.getMetaData().getColumnCount();
	            //logger.info("Column Count is " + total_cols);
	            assetobj = new JSONObject();
	            assetDetailobj = new JSONObject();
	            assetParentobj = new JSONObject();
	            assetParentArray =  new JSONArray();
	            for (int i = 0; i < total_cols; i++) {
	            		colname = resultSet.getMetaData().getColumnLabel(i + 1);
	            	    if (colname.equalsIgnoreCase("CATEGORY") || colname.equalsIgnoreCase("OFFERING") || 
	            	    		colname.equalsIgnoreCase("SOLUTION") || colname.equalsIgnoreCase("OFFERINGID")){
	        	            	//parent detail
	        	            	assetParentobj.put(resultSet.getMetaData().getColumnLabel(i + 1)
	 	    	                        .toLowerCase(), resultSet.getObject(i + 1));
	        	                
	        	         }else{
	        	            	//asset detail
	        	            	assetDetailobj.put(resultSet.getMetaData().getColumnLabel(i + 1)
	 	    	                        .toLowerCase(), resultSet.getObject(i + 1));
	        	         }
	        	           
	            }//end of for
	            assetParentArray.put(assetParentobj);
	            assetobj.put("AssetParents", assetParentArray);
	            assetobj.put("AssetDetail", assetDetailobj);
	            //logger.info("Current Asset object is " + assetobj);
	            if (jsonIndex > 0){
	            	logger.info("Checking for previous asset object");
	            	JSONObject prevObj = jsonArray.getJSONObject(jsonIndex-1);
	            	//logger.info("Previous Asset object is " + prevObj);
	            	JSONArray prevParentArray = prevObj.getJSONArray("AssetParents");
	            	JSONObject prevDetailObj = prevObj.getJSONObject("AssetDetail");
	            	//logger.info("Previous Asset's ID is " + prevDetailObj.getInt("assetid"));
	            	//logger.info("Current Asset's ID is " + assetDetailobj.getInt("assetid"));
	            	if (prevDetailObj.getInt("assetid") == assetDetailobj.getInt("assetid")){
	            		//same asset record
	            		logger.info("Current & Previous Asset ID are same ");
	            		logger.info("Adding current parent details to previous object");
	            		prevParentArray.put(assetParentobj);
	            	}else{
	            		jsonArray.put(assetobj);
	            		jsonIndex++;
	            	}
	            }else{
	            	jsonArray.put(assetobj);
	            	jsonIndex++;
	            }
	            //logger.info("Current state of the JSON array " + jsonArray);
        	}while(resultSet.next());
        }catch(Exception exp){
        	exp.printStackTrace();
        }
        jsonObj.put("result", jsonArray);
        return jsonObj;
    }
}