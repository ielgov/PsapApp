package com.ibm.psap.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject; 
import org.json.JSONArray;
import org.json.JSONException;

import com.ibm.psap.util.Constants;
import com.ibm.psap.util.DBResultSetToJson;

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
			String jsonString = null;
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
					}else{
						//stub
						//jsonString = Constants.CATEGORY_JSONSTR;
						jsonResponse = getJSONResponse("Category", parentId);						
					}
					break;
				case 2:
					if (productionMode){
						//extarct from the data set
					}else{
						//stub
						//jsonString = Constants.SOLUTION_JSONSTR;
						jsonResponse = getJSONResponse("Solution", parentId);				
					}
					break;
				case 3:
					if (productionMode){
						//extarct from the data set
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
