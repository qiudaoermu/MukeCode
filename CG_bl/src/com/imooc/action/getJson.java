package com.imooc.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.opensymphony.xwork2.Action;
import com.sun.org.apache.bcel.internal.generic.NEW;

public class getJson {

	
	 public Map responseJson;  
	 
	 public void setResponseJson(Map responseJson) {   
		 
	        this.responseJson = responseJson;   
	    }   
	 
	 public Map getResponseJson() {   
	        return responseJson;   
	 }   

	public String getList(){   
        Map<String, Object> map = new HashMap<String, Object>();   
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();   
        for(int i=0;i<5;i++){   
            Map<String, Object> m = new HashMap<String, Object>();   
            m.put("id", "tag"+i);   
            m.put("name", "img/Mic"+i+".jpg");   
            list.add(m);   
        }   
        map.put("rows", list);   
        
        this.setResponseJson(map);   
        return Action.SUCCESS;   
    }   
	

	
	
}
