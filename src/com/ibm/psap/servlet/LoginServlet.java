package com.ibm.psap.servlet;

import java.io.IOException;

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
		HttpSession session;
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String errorMsg = null;
		
		
		
		if(email == null || email.equals("")){
			errorMsg ="User Email can't be null or empty";
		}
		if(password == null || password.equals("")){
			errorMsg = "Password can't be null or empty";
		}
		
		if(errorMsg != null){
			RequestDispatcher rd = getServletContext().getRequestDispatcher("/login.jsp");
			request.setAttribute("loginMsg", errorMsg);
			rd.include(request, response);
		}else{
		//authentication check		
		try {
			logger.info("Trying to login with user " +  email);
			request.login(email, password);
			session = request.getSession();
			session.setAttribute("signedIn", true);
        } catch(ServletException ex) {
        	RequestDispatcher rd = getServletContext().getRequestDispatcher("/login.jsp");
			errorMsg = "Login failed. Please check your username/password.";
			logger.error(errorMsg);
			request.setAttribute("loginMsg", errorMsg);
			rd.include(request, response);	
            return;
        }
        
		//authorization check
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			
			ps = con.prepareStatement(Constants.GET_UserRole);
			ps.setString(1, email);
			rs = ps.executeQuery();
			
			if(rs.next()){
				User user = new User(rs.getString("name"), rs.getString("email"), rs.getString("role"));
				logger.info("User found with details="+user);	
				session.setAttribute("User", user);
				response.sendRedirect("index.html");
			}else{
				logger.info("User is not a privileged "+email);
				if (session != null){
					session.invalidate();
				}
				response.sendRedirect("accessdenied.html");
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());
			throw new ServletException("DB problem.");
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

}
