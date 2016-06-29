package com.ibm.psap.servlet.listeners;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Hashtable;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.xml.DOMConfigurator;
import org.json.JSONException;
import org.json.JSONObject;

import com.ibm.psap.util.ReadJsonFile;




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
    		System.out.println("Intializing DB Connection...");
    		Hashtable env = new Hashtable();
    		env.put(Context.INITIAL_CONTEXT_FACTORY,
    		     "com.ibm.websphere.naming.WsnInitialContextFactory");
    		env.put(Context.PROVIDER_URL, "corbaloc:iiop:psap-app:2809");
    		Context serverCtx = new InitialContext(env);
    		System.out.println("Lookup for DB datasource...");
    		javax.sql.DataSource ds = (javax.sql.DataSource) serverCtx.lookup(dbSource);
			ctx.setAttribute("DBConnection", ds.getConnection());
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
    	
    	if (true){
    		System.out.println("Reading the JSON file");
    		//development mode
    		//initialize JSON ststic data
    		JSONObject obj1;
			try {
				obj1 = new JSONObject(ReadJsonFile.readjson(ctx,"Category.json"));
				ctx.setAttribute("Category", obj1);
	    		System.out.println("Successfully loaded Category JSON data");
	    		JSONObject obj2 = new JSONObject(ReadJsonFile.readjson(ctx,"Solution.json"));
	    		ctx.setAttribute("Solution", obj2);
	    		System.out.println("Successfully loaded Solution JSON data");
	    		JSONObject obj3 = new JSONObject(ReadJsonFile.readjson(ctx,"Offering.json"));
	    		ctx.setAttribute("Offering", obj3);
	    		System.out.println("Successfully loaded Offering JSON data");
	    		JSONObject obj4 = new JSONObject(ReadJsonFile.readjson(ctx, "Assets.json"));
	    		ctx.setAttribute("Asset", obj4);
	    		System.out.println("Successfully loaded Assets JSON data");
	    		System.out.println("Successfully loaded JSON data");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    		
    	}
    	
    	//read mapping file
    	{
    		System.out.println("Reading the mapping file");
    		Properties prop = new Properties();
    		InputStream input = null;
			try {
				String webAppPath = ctx.getRealPath("/");
	           
				input = new FileInputStream(webAppPath + "/data/map.properties");
				// load a properties file
				prop.load(input);
	    		ctx.setAttribute("MapFile", prop);
	    		System.out.println("Successfully loaded the mapping file");
	    	} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    		
    	}
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
