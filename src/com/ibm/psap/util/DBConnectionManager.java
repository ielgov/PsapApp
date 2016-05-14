package com.ibm.psap.util;

import javax.naming.*;
import javax.sql.*;
import java.sql.Connection;
import java.sql.SQLException;

public class DBConnectionManager {

	private Connection connection;
	
	public DBConnectionManager(String datasource) throws SQLException, NamingException{
	
		Context ctx= new InitialContext();                        
		DataSource ds=(DataSource)ctx.lookup(datasource);   
		this.connection =ds.getConnection();       
	}
	
	public Connection getConnection(){
		return this.connection;
	}
}
