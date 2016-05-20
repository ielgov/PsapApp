package com.ibm.psap.util;



import java.io.FileReader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;

public class Test {

	public static void main(String[] args) {
		
	
			JSONParser parser = new JSONParser();
			JSONObject jsonObject =  null; 
	        try {
	            Object obj = parser.parse(new FileReader("http://172.27.50.134:9080/PSAP/Assets.json"));
	            jsonObject = (JSONObject) obj;
	            System.out.println(jsonObject);
	        } catch (Exception e) {
	        	e.printStackTrace();
	        }
		
	}

}
/*
 if(rs != null){
				rs.next();
				User user = new User(rs.getString("name"), rs.getString("email"), rs.getString("country"), rs.getInt("id"));
				logger.info("User found with details="+user);
				HttpSession session = request.getSession();
				session.setAttribute("User", user);
				response.sendRedirect("home.html");;
			}else{
				RequestDispatcher rd = getServletContext().getRequestDispatcher("/login.html");
				PrintWriter out= response.getWriter();
				logger.error("User not found with email="+email);
				out.println("<font color=red>No user found with given email id, please register first.</font>");
				rd.include(request, response);
			}
 
*/