package com.ibm.psap.util;


public final class Constants {

    private Constants() {
            // restrict instantiation
    }
    
    //public static final String CognitiveSearchUrl = "https://8d409ad1-cf00-4079-9e0b-0e59387c98a0:J3C5ndaHr7cH@gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/sce670ab37_c683_41a1_93d0_1a26dda6df93/solr/le_collection/select?&wt=json&fl=AssetDisplayName,AssetDisplayDescription,AssetType,URL&q=";
    public static final String CognitiveSearchUrl = "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/sce670ab37_c683_41a1_93d0_1a26dda6df93/solr/le_collection/select?&wt=json&fl=AssetDisplayName,AssetDisplayDescription,AssetType,URL&q=";
    
    public static final String BLUEMIX = "bluemix"; 
    public static final String DB = "db"; 
    public static final String JSON = "json"; 
    
    public static final String CATEGORY_JSONSTR = "[		    {\"CategoryId\":\"01\", \"Name\":\"Intelligent Led Policing\", \"DisplayName\":\"ILP\"},{\"CategoryId\":\"02\", \"Name\":\"Realtime Crime\", \"DisplayName\":\"RLT_CRIME\"}]";
    public static final String SOLUTION_JSONSTR = "[ 			{\"CategoryId\":\"101\", \"Name\": \"Intelligent Analysis\", \"DisplayName\":\"EAI\"}, 			 {\"CategoryId\":\"102\", \"Name\": \"Proactive Policing\", \"DisplayName\":\"ProactivePolice\"}, 			 {\"CategoryId\":\"103\", \"Name\": \"xxxxxxxxxx\", \"DisplayName\":\"yyy\"} 			]";
    public static final String OFFERING_JSONSTR = "[ 			{\"CategoryId\":\"1001\", \"Name\": \"Products\", \"DisplayName\":\" Products\"}, 			 {\"CategoryId\":\"1002\", \"Name\": \"Contact\", \"DisplayName\":\" Contact\"}, 			 {\"CategoryId\":\"1003\", \"Name\": \"Competition\", \"DisplayName\":\" Competition\"} 			]";
	public static final String ASSET_JSONSTR	= "[ 			{\"CategoryId\":\"10001\", \"Name\": \"xxx\", \"DisplayName\":\" yyy\", \"type_content\": \"http://..\", \"type\": \"URL\"}, 			 {\"CategoryId\":\"10002\", \"Name\": \"xx2\", \"DisplayName\":\" yy2\", \"type_content\":\"http://..\", \"type\": \"URL\"}, 			 			 {\"CategoryId\":\"10003\", \"Name\": \"xx3\", \"DisplayName\":\" yy3\", \"type_content\": \"THIS is TEST..\", \"type\": \"PARA\"} 		]";
	public static final String SERACH_JSONSTR	= "{ 			\"solution\": {\"CategoryId\":\"101\", \"Name\": \"Intelligent Analysis\", \"DisplayName\":\"EAI\"}, 			\"Offerings\": [ 			{\"CategoryId\":\"1001\", \"Name\": \"Products\", \"DisplayName\":\" Products\"}, 			 {\"CategoryId\":\"1002\", \"Name\": \"Contact\", \"DisplayName\":\" Contact\"}, 			 {\"CategoryId\":\"1003\", \"Name\": \"Competition\", \"DisplayName\":\" Competition\"} 			] 			 			}";
    
	
    public static final String CATEGORY_TABLE 		= "PUBSAFETY.CATEGORY";
    public static final String CATEGORY_REL_TABLE 	= "PUBSAFETY.CAT_RELATION";
    public static final String USER_TABLE 			= "PUBSAFETY.USER";

    public static final String GET_UserRole = "SELECT \"Name\", \"Email\", \"Role\"  FROM " + USER_TABLE +" WHERE \"Email\"= ?";
    public static final String SET_UserRole = "UPDATE  " + USER_TABLE + " SET \"Name\" = ?, \"Role\" = ?  WHERE \"Email\"= ?";
    public static final String INSERT_User 	= "INSERT INTO " + USER_TABLE + " VALUES (?,?,?)";
    public static final String DELETE_User 	= "DELETE FROM " + USER_TABLE + " WHERE \"Email\"= ?";

    public static final String GET_CategoryRecord 		="SELECT PUBSAFETY.CAT_RELATION.PARENT_CATID, \"CatID\", \"CatDisplayName\", \"CatDesc\" FROM "+
    													"PUBSAFETY.CATEGORY, PUBSAFETY.CAT_RELATION WHERE " +
    													"PUBSAFETY.CAT_RELATION.PARENT_CATID = ? AND " +
    													"\"CatID\" = PUBSAFETY.CAT_RELATION.CHILD_CATID";
    public static final String Set_CategoryRecord 		= "{call INSERTCATEGORYITEM(?, ?, ?)}";
    public static final String Modify_CategoryRecord 	= "UPDATE  " + CATEGORY_TABLE + " SET \"CatDisplayName\" = ?, \"CatDesc\" = ?  WHERE \"CatID\"= ?";
    public static final String Delete_CategoryRecord 	= "{call DELETECATEGORYITEM(?)}";
    
    public static final String GET_AssetRecordForOffering="SELECT \"AssetID\", \"AssetDisplayName\", \"AssetDisplayDescription\",  URL, \"ActionType\", \"AssetType\", \"SourceType\", \"AssetGroupingText\",   \"SubmittedBy\", \"LastUpdatedDate\", \"Status\", \"AdminComments\"   FROM PUBSAFETY.ASSETS , PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP WHERE   PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP.CATID = ? AND   \"AssetID\" = PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP.ASSETID";
    public static final String GET_CubeAssetRecordForOffering="SELECT \"AssetID\", \"AssetDisplayName\", \"AssetDisplayDescription\",  URL, \"ActionType\", \"AssetType\", \"SourceType\", \"AssetGroupingText\",   \"SubmittedBy\", \"LastUpdatedDate\", \"Status\", \"AdminComments\"   FROM PUBSAFETY.ASSETS , PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP WHERE PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP.CATID = ? AND   \"AssetID\" = PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP.ASSETID AND \"Status\" = 'active'";
    
    
    public static final String GET_AssetRecord 			= "SELECT \"AssetID\", PUBSAFETY.CATEGORY.\"CatDisplayName\" As Solution , CAT.\"CatDisplayName\" AS Offering, CAT.\"CatID\" as OfferingID, TB1.\"CatDisplayName\" AS Category, \"AssetDisplayName\", \"AssetDisplayDescription\",  URL, \"ActionType\", \"AssetType\", \"SourceType\", \"AssetGroupingText\",   \"SubmittedBy\", \"LastUpdatedDate\", \"Status\", \"AdminComments\"   FROM PUBSAFETY.ASSETS , PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP, PUBSAFETY.CAT_RELATION,   PUBSAFETY.CATEGORY, PUBSAFETY.CATEGORY CAT, PUBSAFETY.CAT_RELATION TB,  PUBSAFETY.CATEGORY TB1 WHERE   PUBSAFETY.ASSETS.\"SubmittedBy\" LIKE ? AND   \"AssetID\" = PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP.ASSETID AND   PUBSAFETY.CAT_RELATION.CHILD_CATID = PUBSAFETY.ASSET_CATEGORY_MEMBERSHIP.CATID AND   PUBSAFETY.CATEGORY.\"CatID\" = PUBSAFETY.CAT_RELATION.PARENT_CATID AND   CAT.\"CatID\" = PUBSAFETY.CAT_RELATION.CHILD_CATID AND   TB.CHILD_CATID = PUBSAFETY.CAT_RELATION.PARENT_CATID AND TB1.\"CatID\" = TB.PARENT_CATID ORDER BY \"AssetID\""; 
    public static final String Set_AssetRecord			="{call DB2ADMIN.INSERTASSETITEM(?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?)}";
    public static final String Delete_AssetRecord 		="{call DB2ADMIN.DELETEASSETITEM(?)}";
    public static final String Modify_AssetRecord 		="{call DB2ADMIN.UPDATEASSETITEM(?,?,?,?,?,?,?,?,?,?,?)}";
    
    public static final String set_AssetRelation		="INSERT INTO PUBSAFETY.\"ASSET_CATEGORY_MEMBERSHIP\"(\"ASSETID\", \"CATID\") VALUES (?, ?)";
}