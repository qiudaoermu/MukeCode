package com.imooc.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.opensymphony.xwork2.Action;
import com.sun.org.apache.bcel.internal.generic.NEW;

public class getImgAction {

	private int index;
	

	
	
	
	
	
	public Map responseJson;  
	 
	 public void setResponseJson(Map responseJson) {   
		 
	        this.responseJson = responseJson;   
	    }   
	 
	 public Map getResponseJson() {   
	        return responseJson;   
	 }   
	 
	
	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public String getImList(){   
		
        Map<String, Object> map = new HashMap<String, Object>();   
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();   
        
            Map<String, Object> m = new HashMap<String, Object>();   
          
            m.put("name", "img/Mic"+(int)index+".jpg");  
            System.out.println("img/Mic"+(int)index+".jpg");
            list.add(m);   
       
        map.put("rows", list);   
       
        this.setResponseJson(map);   
      
        return Action.SUCCESS;   
    }   
	

	
	
}
