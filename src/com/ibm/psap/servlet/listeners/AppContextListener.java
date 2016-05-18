package com.ibm.psap.servlet.listeners;

import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.xml.DOMConfigurator;




@WebListener
public class AppContextListener implements ServletContextListener {

    public void contextInitialized(ServletContextEvent servletContextEvent) {
    	ServletContext ctx = servletContextEvent.getServletContext();
    	
    	//Get the App mode
    	String mode = ctx.getInitParameter("productionMode");
    	ctx.setAttribute("productionMode", Boolean.parseBoolean(mode));
    	//initialize DB Connection
    	String dbSource = ctx.getInitParameter("dbSource");
    
    	try {
    		InitialContext serverCtx = new javax.naming.InitialContext();
    		javax.sql.DataSource ds = (javax.sql.DataSource) serverCtx.lookup(dbSource);
			//DBConnectionManager connectionManager = new DBConnectionManager (dbSource);
			ctx.setAttribute("DBConnection", ds.getConnection ());
			System.out.println("DB Connection initialized successfully.");
		} catch (NamingException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	
    	//initialize log4j
    	String log4jConfig = ctx.getInitParameter("log4j-config");
    	if(log4jConfig == null){
    		System.err.println("No log4j-config init param, initializing log4j with BasicConfigurator");
			BasicConfigurator.configure();
    	}else {
			String webAppPath = ctx.getRealPath("/");
			String log4jProp = webAppPath + log4jConfig;
			File log4jConfigFile = new File(log4jProp);
			if (log4jConfigFile.exists()) {
				System.out.println("Initializing log4j with: " + log4jProp);
				DOMConfigurator.configure(log4jProp);
			} else {
				System.err.println(log4jProp + " file not found, initializing log4j with BasicConfigurator");
				BasicConfigurator.configure();
			}
		}
    	System.out.println("log4j configured properly");
    }

    public void contextDestroyed(ServletContextEvent servletContextEvent) {
    	Connection con = (Connection) servletContextEvent.getServletContext().getAttribute("DBConnection");
    	try {
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
    }
	
}
