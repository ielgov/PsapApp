package com.ibm.psap.util;

import java.io.Serializable;

public class User implements Serializable{
	
	private static final long serialVersionUID = 6297385302078200511L;
	
	private String name;
	private String email;
	private String role;
	
	public User(String nm, String em, String role){
		this.name=nm;
		this.email=em;
		this.role=role;
	}

	public void setName(String name) {
		this.name = name;
	}


	public void setEmail(String email) {
		this.email = email;
	}

	
	public void setRole(String role) {
		this.role = role;
	}


	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getRole() {
		return role;
	}
	
	@Override
	public String toString(){
		return "Name="+this.name+", Email="+this.email+", role="+this.role;
	}
}
