package com.ibm.psap.util;


public final class Constants {

    private Constants() {
            // restrict instantiation
    }
    public static final String CATEGORY_JSONSTR = "{ 			\"result\": [		    {\"CategoryId\":\"01\", \"Name\":\"Intelligent Led Policing\", \"DisplayName\":\"ILP\"},{\"CategoryId\":\"02\", \"Name\":\"Realtime Crime\", \"DisplayName\":\"RLT_CRIME\"}]}";
    public static final String SOLUTION_JSONSTR = "{ 			\"result\": [ 			{\"CategoryId\":\"101\", \"Name\": \"Intelligent Analysis\", \"DisplayName\":\"EAI\"}, 			 {\"CategoryId\":\"102\", \"Name\": \"Proactive Policing\", \"DisplayName\":\"ProactivePolice\"}, 			 {\"CategoryId\":\"103\", \"Name\": \"xxxxxxxxxx\", \"DisplayName\":\"yyy\"} 			] 			}";
    public static final String OFFERING_JSONSTR = "{ 			\"result\": [ 			{\"CategoryId\":\"1001\", \"Name\": \"Products\", \"DisplayName\":\" Products\"}, 			 {\"CategoryId\":\"1002\", \"Name\": \"Contact\", \"DisplayName\":\" Contact\"}, 			 {\"CategoryId\":\"1003\", \"Name\": \"Competition\", \"DisplayName\":\" Competition\"} 			]			 			}";
	public static final String ASSET_JSONSTR	= "{ 			\"result\": [ 			{\"CategoryId\":\"10001\", \"Name\": \"xxx\", \"DisplayName\":\" yyy\", \"type_content\": \"http://..\", \"type\": \"URL\"}, 			 {\"CategoryId\":\"10002\", \"Name\": \"xx2\", \"DisplayName\":\" yy2\", \"type_content\":\"http://..\", \"type\": \"URL\"}, 			 			 {\"CategoryId\":\"10003\", \"Name\": \"xx3\", \"DisplayName\":\" yy3\", \"type_content\": \"THIS is TEST..\" \"type\": \"PARA\"} 			]			 			}";
	public static final String SERACH_JSONSTR	= "{ 			\"result\": { 			\"solution\": {\"CategoryId\":\"101\", \"Name\": \"Intelligent Analysis\", \"DisplayName\":\"EAI\"}, 			\"Offerings\": [ 			{\"CategoryId\":\"1001\", \"Name\": \"Products\", \"DisplayName\":\" Products\"}, 			 {\"CategoryId\":\"1002\", \"Name\": \"Contact\", \"DisplayName\":\" Contact\"}, 			 {\"CategoryId\":\"1003\", \"Name\": \"Competition\", \"DisplayName\":\" Competition\"} 			] 			 			}}";
    
	
    public static final String CATEGORY_TABLE = "CATEGORY";
    public static final String REL_CATEGORY_TABLE = "CATEGORY_RELATIONSHIP";
    public static final String GET_AllCategories = "SELECT * FROM " + CATEGORY_TABLE + " WHERE TYPE='CATEGORY'";
    public static final String GET_AllSolutionForCategory = "SELECT * FROM " + CATEGORY_TABLE + " WHERE TYPE='SOLUTION'" + " AND ID=(SELECT CHILD_ID FROM )";
    public static final String GET_UserRole = "select  name, email, role from Users where email=? limit 1";
}