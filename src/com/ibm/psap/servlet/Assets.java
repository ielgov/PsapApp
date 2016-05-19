package com.ibm.psap.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.ibm.psap.util.Constants;
import com.ibm.psap.util.DBResultSetToJson;

/**
 * Servlet implementation class Assets
 */
@WebServlet("/Assets")
public class Assets extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(Assets.class);   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Assets() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		String offeridid = request.getParameter("offeringId");
		String parentid = request.getParameter("parentId");
		JSONObject jsonResponse =  null;
		boolean productionMode = (Boolean) getServletContext().getAttribute("productionMode");
		logger.info("The requested type is Asset");
		logger.info("Serach for Asset with offeringid=" +offeridid + " and solutionid=" + parentid);
		if (offeridid!= null && parentid!=null){
			String jsonString =null;
			if (productionMode){
				//extarct from the data set
			}else{
				//stub
				jsonString = Constants.ASSET_JSONSTR;
			}
			
			try {
				logger.info("Stubed JSON string is "+jsonString);
				jsonResponse = DBResultSetToJson.convertStringToJSONArray(jsonString);
				logger.info("Returning the response to request type Asset");
				logger.info("Response to request is "+jsonResponse.toString());
				response.setContentType("application/json");
				response.getWriter().write(jsonResponse.toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new IOException(e.getMessage());
			}
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
