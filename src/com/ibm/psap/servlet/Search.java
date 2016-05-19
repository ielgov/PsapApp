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
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		String solutionName = request.getParameter("name");
		
		JSONObject jsonResponse =  null;
		boolean productionMode =(Boolean)getServletContext().getAttribute("productionMode");
		logger.info("The requested type is Search");
		logger.info("Serach for " +solutionName );
		if (solutionName!=null){
			String jsonString =null;
			if (productionMode){
				//extarct from the data set
			}else{
				//stub
				jsonString = Constants.SERACH_JSONSTR;
			}
			
			try {
				logger.info("Stubed JSON string is "+jsonString);
				jsonResponse = DBResultSetToJson.convertStringToJSON(jsonString);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new IOException(e.getMessage());
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

}
