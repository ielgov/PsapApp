<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>PSAP USER LIST CREATION</title>
    
    <link href="css/style.css" rel="stylesheet" type="text/css" />
	<link href="css/font-awesome.css" rel="stylesheet" type="text/css" />
	<link href="css/fonts.css" rel="stylesheet" type="text/css" />
	<link href="css/flex.css" rel="stylesheet" type="text/css" />
	<link href="css/sizes.css" rel="stylesheet" type="text/css" />
	<link href="css/landingpage.css" rel="stylesheet" type="text/css" />

    <!-- Bootstrap -->
    <!-- <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet"> -->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
	<STYLE>
		* {
		   	cursor: default;
		}		
		body 
		{
			-webkit-user-select: none;
			-moz-user-select: none;
			overflow: hidden;    
			background: radial-gradient(circle at center, #FFFFFF 0%,#B5B5B5 200%);
			background-image: url(images/background/WORLDMAPDOTCS-1-1920x1080.png),url(images/background/PSSbg-1920x1080.png);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;		
		}
		
		
		.form-style-1 {
		    margin:10px auto;
		    max-width: 400px;
		    padding: 20px 12px 10px 20px;
		    font: 13px "Lucida Sans Unicode", "Lucida Grande", sans-serif;
		}
		.form-style-1 li {
		    padding: 0;
		    display: block;
		    list-style: none;
		    margin: 10px 0 0 0;
		}
		.form-style-1 label{
		    margin:0 0 3px 0;
		    padding:0px;
		    display:block;
		    font-weight: bold;
		    color: black;
		}
		.form-style-1 input[type=text],
		.form-style-1 input[type=date],
		.form-style-1 input[type=datetime],
		.form-style-1 input[type=number],
		.form-style-1 input[type=search],
		.form-style-1 input[type=time],
		.form-style-1 input[type=url],
		.form-style-1 input[type=email],
		textarea,
		select{
		    box-sizing: border-box;
		    -webkit-box-sizing: border-box;
		    -moz-box-sizing: border-box;
		    border:1px solid #BEBEBE;
		    padding: 7px;
		    margin:0px;
		    -webkit-transition: all 0.30s ease-in-out;
		    -moz-transition: all 0.30s ease-in-out;
		    -ms-transition: all 0.30s ease-in-out;
		    -o-transition: all 0.30s ease-in-out;
		    outline: none; 
		}
		.form-style-1 input[type=text]:focus,
		.form-style-1 input[type=date]:focus,
		.form-style-1 input[type=datetime]:focus,
		.form-style-1 input[type=number]:focus,
		.form-style-1 input[type=search]:focus,
		.form-style-1 input[type=time]:focus,
		.form-style-1 input[type=url]:focus,
		.form-style-1 input[type=email]:focus,
		.form-style-1 textarea:focus,
		.form-style-1 select:focus{
		    -moz-box-shadow: 0 0 8px #88D5E9;
		    -webkit-box-shadow: 0 0 8px #88D5E9;
		    box-shadow: 0 0 8px #88D5E9;
		    border: 1px solid #88D5E9;
		}
		.form-style-1 .field-divided{
		    width: 49%;
		}
		
		.form-style-1 .field-long{
		    width: 100%;
		}
		.form-style-1 .field-select{
		    width: 100%;
		}
		.form-style-1 .field-textarea{
		    height: 100px;
		}
		.form-style-1 input[type=submit], .form-style-1 input[type=button]{
		    background: #4B99AD;
		    padding: 8px 15px 8px 15px;
		    border: none;
		    color: #fff;
		}
		.form-style-1 input[type=submit]:hover, .form-style-1 input[type=button]:hover{
		    background: #4691A4;
		    box-shadow:none;
		    -moz-box-shadow:none;
		    -webkit-box-shadow:none;
		}
		.form-style-1 .required{
		    color:red;
		}
		
	</STYLE>
    
  </head>
  <body style="visibility: visible;height:100vh;width:100vw;">
    
    <div id="Stats-output"></div>    
    <div id="header" class="helvLightFont display-flex flex-row flex-align-center flex-justify-space-between">
    	<div class="display-flex flex-align-center">
    		<div class="home-icon" onclick="gotoHome()"></div>
			<div class="ibm-logo"></div>
			<div class="title">Public Safety Solutions</div>
		</div>    	
    </div>	
   
    <div id="container">
    	<form method="post" action="UsrList" >
			<ul class="form-style-1">
			    <li><label>
			    <%
							String Msg =  (String)request.getAttribute("Msg");
							if (Msg != null)
								out.println("<font color=red>"+Msg+"</font>");
				%>
			    </label></li>
			    
			    <li><label>Full Name </label><input type="text" name="field1" class="field-divided" placeholder="First" />&nbsp;<input type="text" name="field2" class="field-divided" placeholder="Last" /></li>
			    <li>
			        <label>Email <span class="required">*</span></label>
			        <input type="email" name="field3" class="field-long" />
			    </li>
			    <li>
			        <label>Role <span class="required">*</span></label>
			        <select name="field4" class="field-select">
			        <option value="usr">User</option>
			        <option value="admin">Administrator</option>
			        </select>
			    </li>
			    <li>
			        <label>Comments </label>
			        <textarea name="field5" id="field5" class="field-long field-textarea"></textarea>
			    </li>
			    <li>
			        <input name="submit" type="submit" value="Submit" />
			        <input name="search" type="submit" value="Search" />
			        <input name="delete" type="submit" value="Delete" />
			    </li>
			</ul>
		</form>
	
    </div>
    
     <script type="text/javascript" src="js/Threejs/jquery.min.js"></script>
     <script src="js/config.js"></script>
     <script src="js/userlistform_main.js"></script>
	
	<script>
		
		var onUserAction;
		var webGLWidth, webGLHeight;
		$( function(){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
			{
				onUserAction = "touchstart";
			}
			else
			{
				onUserAction = "click";
			}
			
		});
		
		function gotoHome(){
			 window.open("/PSAP/index.html", "_self");
		}
	</script>
  </body>
</html>