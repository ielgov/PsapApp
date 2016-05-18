package com.ibm.psap.util;

import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String jsonstr = "[{\"CategoryId\":\"01\", \"Name\":\"Intelligent Led Policing\", \"DisplayName\":\"ILP\"},{\"CategoryId\":\"02\", \"Name\":\"Realtime Crime\", \"DisplayName\":\"RLT_CRIME\"}]";
		try {
			JSONArray jsonArray = new JSONArray(jsonstr);
			JSONObject obj = new JSONObject();
			obj.put("result", jsonArray);
			System.out.println(obj);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
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