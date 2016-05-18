package com.ibm.psap.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.ibm.psap.util.Constants;
import com.ibm.psap.util.User;

@WebServlet(name = "Login", urlPatterns = { "/Login" })
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	static Logger logger = Logger.getLogger(LoginServlet.class);
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		boolean productionMode =(boolean)getServletContext().getAttribute("productionMode");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String errorMsg = null;
		
		if (productionMode){	
		if(email == null || email.equals("")){
			errorMsg ="User Email can't be null or empty";
		}
		if(password == null || password.equals("")){
			errorMsg = "Password can't be null or empty";
		}
		
		if(errorMsg != null){
			RequestDispatcher rd = getServletContext().getRequestDispatcher("/login.html");
			PrintWriter out= response.getWriter();
			out.println("<font color=red>"+errorMsg+"</font>");
			rd.include(request, response);
		}else{
		//authentication check
		try {
			request.login(email, password);
        } catch(ServletException ex) {
        	RequestDispatcher rd = getServletContext().getRequestDispatcher("/login.html");
			PrintWriter out= response.getWriter();
			errorMsg = "Login Failed with a ServletException.." + ex.getMessage();
			logger.error(errorMsg);
			out.println("<font color=red>"+errorMsg+"</font>");
			rd.include(request, response);	
            return;
        }
		//check user's authority
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			
			ps = con.prepareStatement(Constants.GET_UserRole);
			ps.setString(1, email);
			rs = ps.executeQuery();
			
			if(rs != null){
				rs.next();
				User user = new User(rs.getString("name"), rs.getString("email"), rs.getString("role"));
				logger.info("User found with details="+user);
				HttpSession session = request.getSession();
				session.setAttribute("User", user);
				response.sendRedirect("home.html");
			}else{
				User user = new User("smith", email, "user");
				logger.info("User is not an administartor "+user);
				HttpSession session = request.getSession();
				session.setAttribute("User", user);
				response.sendRedirect("home.html");
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database connection problem");
			throw new ServletException("DB Connection problem.");
		}finally{
			try {
				rs.close();
				ps.close();
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}
		}
		}
		else{
			//stub mode
			User user = new User(email, email, "user");
			logger.info("Stub Mode");
			HttpSession session = request.getSession();
			session.setAttribute("User", user);
			response.sendRedirect("home.html");
		}
	}

}
