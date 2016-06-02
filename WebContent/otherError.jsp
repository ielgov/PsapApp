<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1">
    <link rel="stylesheet" type="text/css" href="css/loginbundle.css">
    <title>PSAP Exception</title>
    <STYLE TYPE="text/css">
		
		.hidden {
			font-weight:bold;
			position:absolute;
			left:-10000px;
			top:auto;
			width:1px;
			height:1px;
			overflow:hidden;
		}
		
		.visible {
			font-weight:bold;
			position:static; 
			width:auto; 
			height:auto;
		}
		</STYLE>
		
    <SCRIPT type="text/javascript">
            
    	function setInputBox(){
    		var mql = window.matchMedia("screen and (max-width: 768px)")
    		
    		//var mql = "screen and (max-device-width: 480px)";
    		console.log("mql - "+mql);
    		if (mql.matches){ // if media query matches
    	  		console.log("Mobile detected.")
    			document.getElementById("desktop").removeAttribute("name");
                return "mobile";
    	 	}
    	 	else{
    	  		console.log("Desktop detected");
    	  		document.getElementById("mobile").removeAttribute("name"); 
    	  		return "desktop";
    	 	}
    	}

            function windowStart() {
                displayError();
                setInputBox();
            }
            
            function displayError(){
                var errorDiv = document.getElementById('errorDiv');
                var errorStr="";
                
                if (errorStr != "") {
                    console.log("Error String - "+errorStr);
                    if(errorStr.indexOf("HPDIA0200W")!=-1){
                    errorDiv.innerHTML = "<p class=\"error\">Your <span class=\"normal\">w3</span>id or password was entered incorrectly.<\/p>";
                    }
                    else{
                    errorDiv.innerHTML = "<p class=\"error\">Authentication to <span class=\"normal\">w3</span>id is currently unavailable. Please try again later or contact the system administrator.<\/p>";
                    }
                    errorDiv.className = "errorMessage visible";
                    
                }      
            }
            
            window.onload = windowStart;
    
            
    </SCRIPT>
  </head>
	<body>
  		<div class="wrapper">
	    	<!-- header -->
	      	<div id="header">
	        	<div class="inner">
	            	<div id="logo"></div>
	          	</div>
	      	</div>
	      	<!-- /header -->
	      
			<div class="inner">
	  			<div class="container">
	    			<div align="center" id="errStatus">
	    				<h4>Exception Details</h4>
	      				<h3>
	      				<%
	      				String servletName = (String) request
	    				.getAttribute("javax.servlet.error.servlet_name");
	      				if (servletName == null) {
	      					servletName = "Unknown";
	      				}
                    	out.println(servletName);
	      				%>
	      				</h3><BR>
	      				<h2>Exception Name: <% 
	      				Throwable throwable = (Throwable) request
	    				.getAttribute("javax.servlet.error.exception");
	      				out.println(throwable.getClass().getName());
	      				%></h2><BR>
	      				<h2>Exception Message: <% 
	      				out.println(throwable.getMessage());
	      				%></h2><BR>
	      				<h2> If it happens again contact PSAP support team at <a href="mailto:gscgov@us.ibm.com"> IBM GSC </a></h2>
	      				<BR>
	      				<a href="home.html">Home Page</a>
	      			</div>
				</div>
			</div>
    	</div>
    	<!-- footer -->
    	<div id="footer">
      		<div class="inner">
        		<div id="logo"></div>
      		</div>
    	</div>
    	<!-- /footer -->
  	</body>
</html>