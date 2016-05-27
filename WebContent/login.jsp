<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1">
    <link rel="stylesheet" type="text/css" href="css/loginbundle.css">
    <title>IBM W3 ID</title>
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
	    			<div class="signin">
	      				<div class="icon"></div>
	      				<h3>Sign in with your <span class="name">w3<b>id</b></span></h3>
	      			
						
						<div id="errorDiv" > 
							<%
							String errorMsg =  (String)request.getAttribute("loginMsg");
							if (errorMsg != null)
								out.println("<font color=red>"+errorMsg+"</font>");
							%>
						</div>
						<!--- END Cookie check block --->
				     	<form method="post" action="Login" >
					      	<input type="hidden" name="login-form-type" value="pwd"/>
                            <input id="desktop" type="email" class="desktop" name="email" placeholder="Your IBM email address (e.g. jdoe@us.ibm.com)"/>
	      					<input id="mobile" type="email" class="mobile"  name="email" placeholder="jdoe@us.ibm.com"/>
	      					<input type="password" name="password" placeholder="Password"/>
					      	<input type="submit" value="Login"/>
					    </form>
					</div>
				</div>
			</div>
			<div class="push"></div>
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