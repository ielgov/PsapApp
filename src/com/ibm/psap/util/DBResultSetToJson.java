package com.ibm.psap.util;

import org.json.JSONArray;  
import org.json.JSONObject;  
import java.sql.ResultSet;  

public class DBResultSetToJson {
	/**
     * Convert a result set into a JSON Array
     * @param resultSet
     * @return a JSONArray
     * @throws Exception
     */
    public static JSONArray convertToJSONArray(ResultSet resultSet)
            throws Exception {
        JSONArray jsonArray = new JSONArray();
        while (resultSet.next()) {
            int total_cols = resultSet.getMetaData().getColumnCount();
            JSONObject obj = new JSONObject();
            for (int i = 0; i < total_cols; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
                        .toLowerCase(), resultSet.getObject(i + 1));
                jsonArray.put(obj);
            }
        }
        return jsonArray;
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
}