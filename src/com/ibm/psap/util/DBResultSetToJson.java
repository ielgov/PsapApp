package com.ibm.psap.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;  
import java.sql.ResultSet;  

public class DBResultSetToJson {
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
        while (resultSet.next()) {
            int total_cols = resultSet.getMetaData().getColumnCount();
            JSONObject obj = new JSONObject();
            for (int i = 0; i < total_cols; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
                        .toLowerCase(), resultSet.getObject(i + 1));
                jsonArray.put(obj);
            }
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
     * Convert a String into a JSON Array
     * @param JSON String
     * @return a JSONArray
     * @throws Exception
     */
    public static JSONObject convertStringToJSONArray(String jsStr)
            throws Exception {
        JSONArray jsonArray = null;
        JSONObject jsonObj =  null;
        try {
			jsonArray = new JSONArray(jsStr);
			jsonObj = new JSONObject();
			jsonObj.put("result", jsonArray);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return jsonObj;
    }
}