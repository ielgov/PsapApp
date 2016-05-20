package com.ibm.psap.util;


import java.io.FileReader;

import javax.servlet.ServletContext;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public final class ReadJsonFile {
		
	public static String readjson(ServletContext ctx, String filename){
		JSONParser parser = new JSONParser();
		JSONObject jsonObject =  null; 
        try {
        	String webAppPath = ctx.getRealPath("/");
            Object obj = parser.parse(new FileReader(webAppPath + "/data" + filename));
            jsonObject = (JSONObject) obj;
    
        } catch (Exception e) {
        	e.printStackTrace();
        }
        return jsonObject.toString();
	}

}
