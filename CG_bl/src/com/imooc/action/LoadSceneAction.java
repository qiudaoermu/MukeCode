/**
 * 
 */
/**
 * @author Administrator
 *
 */
package com.imooc.action;
import java.util.HashMap; 
import java.io.*;

import org.apache.struts2.ServletActionContext;


import com.opensymphony.xwork2.ActionSupport;  

import javax.servlet.http.HttpServletResponse;

public class LoadSceneAction extends ActionSupport{
	
	public void write() throws IOException{  
		
	    HttpServletResponse response=ServletActionContext.getResponse();  
	    /* 
	     * 在调用getWriter之前未设置编码(既调用setContentType或者setCharacterEncoding方法设置编码), 
	     * HttpServletResponse则会返回一个用默认的编码(既ISO-8859-1)编码的PrintWriter实例。这样就会 
	     * 造成中文乱码。而且设置编码时必须在调用getWriter之前设置,不然是无效的。 
	     * */  
	    response.setContentType("text/html;charset=utf-8");  
	    //response.setCharacterEncoding("UTF-8");  
	    PrintWriter out = response.getWriter();  
	    //JSON在传递过程中是普通字符串形式传递的，这里简单拼接一个做测试  
	    String jsonString="{\"user\":{\"id\":\"123\",\"name\":\"张三\",\"say\":\"Hello , i am a action to print a json!\",\"password\":\"JSON\"},\"success\":true}";  
	    out.println(jsonString);  
	    out.flush();  
	    out.close();  
	}   	
	
	
	
}