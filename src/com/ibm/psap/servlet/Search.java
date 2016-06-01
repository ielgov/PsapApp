package com.ibm.psap.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
		String solutionID=null;
		if (productionMode){
			solutionID = request.getParameter("name");
		}else{
			solutionID = request.getParameter("CategoryID");
		}
			
		JSONObject jsonResponse =  null;
		logger.info("The requested type is Search");
		logger.info("Serach for " +solutionID );
		if (solutionID!=null){

			if (productionMode){
				//extarct from the data set
			}else{
				//stub	
				//jsonString = Constants.SERACH_JSONSTR;
				jsonResponse = getJSONResponse("Offering", solutionID);
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
			throw new IOException(e.getMessage());
		}			
		return Responseobj;
	}
}
