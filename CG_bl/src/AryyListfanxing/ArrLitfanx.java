package AryyListfanxing;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sun.org.apache.bcel.internal.generic.NEW;

import Haspmap.Hapsma;
public class ArrLitfanx {
	
	private String str = "abv";
	
	
	public void arrfanx(){
		Hapsma hapsma1 = new Hapsma();
		Map<String, String> m1 = new HashMap<String, String>();
		m1.put("sky","fly");
		hapsma1.Hname();
		
		List<String> list = new ArrayList<String>();
		List<Map> list2 = new ArrayList<Map>();
		
		list2.add(m1);


		list.add("abv");
		System.out.println(list2);
	}
	
	
	
	public String getStr() {
		return str;
	}



	public void setStr(String str) {
		this.str = str;
	}


/*
	public void changeString(String str) {
		this.str = str;
		
	}*/
	
	
	
	public static void main(String[] args) {
		ArrLitfanx arrfanx = new ArrLitfanx();
		arrfanx.arrfanx();
		//arrfanx.changeString("xiaomao");
		arrfanx.setStr("firfox");
		arrfanx.getStr();
		System.out.println(arrfanx.str);
	}
	
}
