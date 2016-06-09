package com.ibm.psap.servlet.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

@WebFilter("/AuthenticationFilter")
public class AuthenticationFilter implements Filter {

	private Logger logger = Logger.getLogger(AuthenticationFilter.class);
	
	public void init(FilterConfig fConfig) throws ServletException {
		logger.info("AuthenticationFilter initialized");
	}
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		String uri = req.getRequestURI();
		logger.info("Requested Resource::"+uri);
		//Only for DEV environment to by-pass security for the APIs
		if ( false){
			if( ( uri.indexOf("/Categories")!= -1) || ( uri.indexOf("/Assets")!= -1) || 
					( uri.indexOf("/UsrList")!= -1) || ( uri.endsWith("/userlistform.jsp") ) ){
				logger.error("By-passing authentication");
				// pass the request along the filter chain
				chain.doFilter(request, response);
				return;
			}	
		}
		
		HttpSession session = req.getSession(false);
		if (uri.endsWith("css") || uri.endsWith("fonts") || uri.endsWith("png") || 
				uri.endsWith("js") || uri.endsWith("gif")){
			chain.doFilter(request, response);
		}else{
			//Frame work to check for authentication
			if(session == null && !(uri.endsWith("login.jsp") || uri.endsWith("Login"))){
				logger.error("Unauthorized access request");
				if (uri.endsWith("accessdenied.html")){
					//directing to access dined page
					chain.doFilter(request, response);
				}
				else{
					res.sendRedirect("/PSAP/login.jsp");
				}	
			}else{
				if (session == null){
					logger.info("SESSION is NULL");
					chain.doFilter(request, response);
				}	
				else{
					logger.info("NOT NULL");
					Object bsingned = session.getAttribute("signedIn");	
					if (bsingned != null && ((Boolean)bsingned)){
						logger.info("YES Signed IN");
						// pass the request along the filter chain
						chain.doFilter(request, response);
					}else{
						logger.info("NOT Signed IN");
						if ( uri.endsWith("Login")){
							chain.doFilter(request, response);
						}else{
							session.invalidate();
							res.sendRedirect("/PSAP/login.jsp");
						}	
					}
				}
				
			}
		}
		/*
		// Temporary Frame work to by-pass authentication
		if(session == null ){
			logger.error("Setting session and By-passing authentication");
			session = req.getSession();
			// pass the request along the filter chain
			chain.doFilter(request, response);
		}else{
			
			chain.doFilter(request, response);
		}
		*/
		
	}

	public void destroy() {
		//close any resources here
	}

}
