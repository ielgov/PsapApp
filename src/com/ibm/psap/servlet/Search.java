package com.ibm.psap.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.ibm.psap.util.Constants;
import com.ibm.psap.util.User;

/**
 * Servlet implementation class Search
 */
@WebServlet("/Search")
public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(Search.class);    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Search() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		boolean productionMode =(Boolean)getServletContext().getAttribute("productionMode");
		String querytext = request.getParameter("queryText");
		String resultcount = request.getParameter("resultcount");
				
		JSONObject jsonResponse =  null;
		logger.info("The requested type is Search");
		logger.info("Serach for " +querytext );
		if (querytext!=null){

			if (productionMode){
				//extarct from the bluemix
				jsonResponse = callCognitiveSearch(request, querytext, resultcount);
			}else{
				//stub	
				logger.info("The search action is not stubed. Use bluemix");
				
			}
		
		}
		logger.info("Returning the response to request type Search");
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
	
	protected JSONObject callCognitiveSearch( HttpServletRequest request, String query, String resultcount) 
			throws IOException {
		logger.info("Calling Cognitivie Serach");
		//logger.info(obj.toString());
		JSONObject Responseobj =  new JSONObject();
		//JSONObject serachobj =  new JSONObject();
		try {
			String searchresult = sendGet(request, query, resultcount);
			if (searchresult != null){
				Responseobj = new JSONObject(searchresult);
				logger.info("Created a json object for the serach results");
			}else{
				//empty object
				Responseobj =  new JSONObject();
			}
			//Responseobj =  new JSONObject();
			//Responseobj.put("result", serachobj);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			throw new IOException(e.getMessage());
		}			
		return Responseobj;
	}
	
	 
	// HTTP GET request
	protected String sendGet(HttpServletRequest request, String query, String resultcount) throws IOException {
			logger.info("Setting Cognitive URL");
			BufferedReader in =  null;
			StringBuffer response =  null;
			OutputStreamWriter wr =  null;
			
			try{
				//create URL query
				String cog_searchURL = Constants.CognitiveSearchUrl;
				cog_searchURL =  cog_searchURL + query;
				HttpSession session =  request.getSession();
				if ( session != null){
					User userobj  = (User) session.getAttribute("User");
					if (userobj != null)
						cog_searchURL = cog_searchURL + "&userid=" + userobj.getEmail();
				}
				if (resultcount != null)
					cog_searchURL =  cog_searchURL + "&resultcount=" + resultcount;
				else
					cog_searchURL =  cog_searchURL + "&resultcount=20"; //default
				/*
				serachbody.put("userID", userobj.getEmail());
				serachbody.put("queryText ", query);
				*/
				logger.info("The final HTTPS Cognitive URL is " +  cog_searchURL);
				
				
				URL obj = new URL(cog_searchURL);
				HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();
	
				// optional default is GET
				con.setRequestMethod("GET");
	
				//add request header
				con.setRequestProperty("Content-Type", "application/json");
				con.setRequestProperty("Accept", "application/json");
				con.setRequestProperty("Authorization", "Basic " + "OGQ0MDlhZDEtY2YwMC00MDc5LTllMGItMGU1OTM4N2M5OGEwOkozQzVuZGFIcjdjSA==");
				/*
				wr = new OutputStreamWriter(con.getOutputStream());
				wr.write(serachbody.toString());
				wr.flush();
				logger.info("Setting json query and user id to cognitive url body");
				*/
				
				int responseCode = con.getResponseCode();
				logger.info("Response Code : " + responseCode);
				if ( responseCode == 200){
					logger.info("Reading the search results");
					in = new BufferedReader(
					        new InputStreamReader(con.getInputStream()));
					String inputLine;
					response = new StringBuffer();
					while ((inputLine = in.readLine()) != null) {
						response.append(inputLine);
					}
					//print result
					logger.info("The result[" + response.toString() + "]");
				}
			}catch(Exception exp){
				logger.error(exp.getMessage());
				throw new IOException (exp.getMessage());
			}finally{
				if (in != null)
					in.close();
				if (wr !=null)
					wr.close();
			}
			return response.toString();
	}
}
