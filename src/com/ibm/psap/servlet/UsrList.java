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
import org.json.JSONObject;

import com.ibm.psap.util.Constants;
import com.ibm.psap.util.User;

/**
 * Servlet implementation class UsrList
 */
@WebServlet("/UsrList")
public class UsrList extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(UsrList.class);
	   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UsrList() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String action = request.getParameter("type");
		if (action !=null && action.equalsIgnoreCase("getSignedUser")){
			logger.info("Retreving user information");
			HttpSession session = request.getSession();
			if (session != null){
			    try {
			    	User userobj  = (User) session.getAttribute("User");
					JSONObject obj = new JSONObject();
				    obj.put("name",  userobj.getName());
				    obj.put("email", userobj.getEmail());
				    obj.put("role",  userobj.getRole());
				    logger.info("Returning the response to request type getUserInfo");
				    logger.info("Response to request is "+obj.toString());
				    response.setContentType("application/json");
				    response.getWriter().write(obj.toString());
			    } catch (Exception e) {
					// TODO Auto-generated catch block
				    throw new IOException(e.getMessage());
			    }
			}   
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
				//response.getWriter().append("Served at: ").append(request.getContextPath());
				String fname = request.getParameter("field1");
				String lname = request.getParameter("field2");
				String email = request.getParameter("field3");
				String role = request.getParameter("field4");
				int action = 0; //1-submit,2-search, 3-delete
				if (request.getParameter("search") != null) {
				    // serach Form is submitted.
					action = 2;
				} else if (request.getParameter("submit") != null){
				    // update/insert is not submitted.
					action = 1;
				}else{
					//delete
					action = 3;
				}
				logger.info("The Action is " + action);
				String Msg = null;
				
				try {
					switch(action){
					case 1:
						Msg = CheckAndUpdateUserList(fname, lname, email, role);
						break;
					case 2:
						Msg = serachUserList( email );
						break;
					case 3:
						Msg = deleteUserList( email );
						break;
					default:
						break;
					}
					if (Msg != null){
						request.setAttribute("Msg", Msg);	
					}	
					RequestDispatcher rd = getServletContext().getRequestDispatcher("/userlistform.jsp");
					rd.include(request, response);	
				} catch (Exception e) {
					// TODO Auto-generated catch block
					throw new ServletException(e.getMessage());
				}

	}
	
	public String CheckAndUpdateUserList(String firstname, String lastname, String email, String role) throws Exception{
		logger.info("Entering CheckAndUpdateUserList()");
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		String Msg = null;
		PreparedStatement ps = null;
		PreparedStatement ps1 = null;
		PreparedStatement ps2  = null;
		
		ResultSet rs = null;
		try {
			ps = con.prepareStatement(Constants.GET_UserRole);
			ps.setString(1, email);
			rs = ps.executeQuery();
			String name  = firstname + " " +lastname;
			if(rs.next()){
				logger.info("User found and Update the details");
				ps1 = con.prepareStatement(Constants.SET_UserRole);
				ps1.setString(1, name);
				ps1.setString(2, role);
				ps1.setString(3, email);
				if ( ps1.executeUpdate() == 0)
					Msg = "Cannot update the user list";
				else
					Msg = "Successfully updated the user list";
			}else{
				logger.info("User not found and Insert the user details");
				ps2 = con.prepareStatement(Constants.INSERT_User);
				ps2.setString(1, name);
				ps2.setString(2, email);
				ps2.setString(3, role);
				ps2.executeUpdate();
				Msg = "Successfully inserted the record to the user list";
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());		
			throw new Exception("DB problem.");
		}finally{
			try {
				rs.close();
				ps.close();
				if (ps1!=null)
					ps1.close();
				if (ps2!=null)
					ps2.close();
				return Msg;
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}
		return Msg;
	}
	
	public String serachUserList(String email) throws Exception{
		logger.info("Entering serachUserList()");
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		String Msg = null;
		PreparedStatement ps = null;
		
		ResultSet rs = null;
		try {
			ps = con.prepareStatement(Constants.GET_UserRole);
			ps.setString(1, email);
			rs = ps.executeQuery();
			if(rs.next()){
				logger.info("User found");
				Msg = "The user is in the list";
			}else{
				logger.info("User not found");
				Msg = "The user not in the list";
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());		
			throw new Exception("DB problem.");
		}finally{
			try {
				rs.close();
				ps.close();
				return Msg;
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}
		return Msg;
	}
	
	public String deleteUserList(String email) throws Exception{
		logger.info("Entering deleteUserList()");
		Connection con = (Connection) getServletContext().getAttribute("DBConnection");
		String Msg = null;
		PreparedStatement ps = null;	

		try {
			ps = con.prepareStatement(Constants.DELETE_User);
			ps.setString(1, email);
			ps.executeUpdate();
			logger.info("User deleted from the list");
			Msg = "User successfully deleted from the list";
			
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("Database problem: " + e.getMessage());		
			throw new Exception("DB problem.");
		}finally{
			try {
			
				ps.close();
				return Msg;
			} catch (SQLException e) {
				logger.error("SQLException in closing PreparedStatement or ResultSet");;
			}
			
		}
		return Msg;
	}
}
