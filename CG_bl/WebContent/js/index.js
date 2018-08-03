
var imgSize = [
               {width:600,height:790},
               {width:1719,height:732},
               {width:935,height:971},
               {width:682,height:402},
               {width:994,height:357}
               ];
$.ajax({
		type:"POST",
		data:{},
		url:"getJson.action",
		async: false
	}).done(function(data){
		//console.log(data)
		var html="";
		var row = data.rows;
			$.each(row,function(i,index){
				var li = "<li class="+index.id+"></li>"
				html+=li;
			})
		//console.log(html)
		$(".boald .wall").html(html);
	})
  var mark = false;
  var i=-1;
  // init();
  createImg()
  var index;
 function createImg(){

	  $(".wall li").click(function(){
		 var _this = $(this);
		  index = $(this).index();
		  $.ajax({
			  type:"POST",
			  url:"getImg.action",
			  data:{index:index},
			  async: false
		  }).done(function(data){
			   var html="";
			  	//console.log(data);
			  	var row = data.rows;
			  	//console.log(row)
			  	//console.log(index)
			  	var dataImg = data.rows[0];
			  	//console.log(dataImg);
			  	//console.log(dataImg.name)
			  	var li = "<img src="+dataImg.name+">"
			  	_this.html(li)

			  	init(_this)
		  	})

  });

 }



function init(_this){

    var screenImage = _this.find('img');
    setTimeout(function(){
    	var imgSrc = screenImage.attr("src");
        var theImage = $("<img/>");

        theImage.attr({"id":"ImgID","src":imgSrc})
          var theImage2 = new Image();

          theImage2.src = imgSrc;

          var imageWidth = theImage2.width;
          var imageHeight = theImage2.height;
          //console.log(imageHeight)

          var div = $('<div class="model"><div class="box"><img id="loading" src=img/fz.gif></div></div>');
          //console.log($("#loading"))

          div.append(theImage);

          $('body').append(div);

          $(".box").bind("click", function(e) {


                if (e.currentTarget.className=="model") {
                 // $(".model").remove();

                }
           });


          changeSizeOrigal(imageWidth,imageHeight,div,theImage,$("#ImgID"))


    },500)
}


/*
第一次点击出现图片
*/

function changeSizeOrigal(width,height,div,theImage,id) {
  var oWith=400;
  var oheight =0;
  var opa = 0.3;

  var time = setInterval(function(){
	 // //console.log("time")
      var flag = false;
        var widthFlag;
    // oWith = oWith+5;
      oheight = oheight+5;
      // //console.log(oheight);
     // //console.log(height);
      var percent = width/height;
      if(oheight>=height+40){
        oheight = height+40;
        clearInterval(time)
        flag = true;
        // //console.log(flag);
        if (flag) {
        	////console.log("flag")
          changeWidth(oWith,width,id)
          $(".box").append(theImage);

          // //console.log(widthFlag);
        }

      }
      //	//console.log("oWith"+oWith)
       $(".box").css({"height":oheight,"left":'50%',"top":'50%',"marginTop":-oheight/2})


  },1)

}


/*
  点击左右按钮执行的change
*/

function changeSize(width,height,id,oWithSize,oheightSize) {

	console.log("next")
  // //console.log(id);
  var oWith=width;
  var oheight = height;
  var opa = 0.3;

  var time = setInterval(function(){

      var flag = false;
        var widthFlag;
    // oWith = oWith+5;

      // //console.log(oheight);
     // //console.log(height);
      var percent = width/height;

      if(oheight<oheightSize){
    	  oheight = oheight+3;
    	  if(oheight>=oheightSize+40){
    	        oheight = oheightSize+40;
    	        clearInterval(time)
    	        flag = true;
    	        // //console.log(flag);
    	        if (flag) {
    	          changeWidth(oWith,oWithSize,id)
    	          // $(".box").append(theImage);
    	          // //console.log(widthFlag);
    	        }

    	      }

      }else{

    	  oheight = oheight-3;
    	  if(oheight<=oheightSize+40){
    	        oheight = oheightSize+40;
    	        clearInterval(time)
    	        flag = true;
    	        // //console.log(flag);
    	        if (flag) {
    	          changeWidth(oWith,oWithSize,id)
    	          // $(".box").append(theImage);
    	          // //console.log(widthFlag);
    	        }
    	      }
      }
      $(".box").css({"width":oWith,"height":oheight,"left":'50%',"marginLeft":-oWith/2,"top":'50%',"marginTop":-oheight/2})

      //console.log($(".turn").css({"display":"block"}));
  },1)

}



function changeWidth(oWith,width,id){
    var changeOpFlag = true;
	  var time2 = setInterval(function(){

		  if(oWith<width+40){

			  oWith=oWith+5;
			  ////console.log(oWith+":"+width)
			 // //console.log($.type(width))
			  if(oWith>=(width+40)){

					clearInterval(time2)
			        changeOpFlag = false;
		          if(changeOpFlag==false){
		            changImgOpacity(id);
		          }
			 }
		  }else{
			  oWith-=5;
			  if(oWith<=width+40){
						  	clearInterval(time2)
			          changeOpFlag = false;
			          if(changeOpFlag==false){

			            changImgOpacity(id)
			          }
			 }
		  }
		  $(".box").css({"width":oWith,"left":'50%',"marginLeft":-oWith/2,"top":'50%'})
		  },1)
  }


	function changImgOpacity(id){
		// debugger;
	  var opa = 0;
	  var opaTime = setInterval(function(){
	        opa =  opa+0.01;
	      // //console.log(opa);
	     // //console.log(id);
	        id.css({"opacity":opa})
	        if (opa>=1) {
	          clearInterval(opaTime);
	          mark = true;
            $("#loading").remove();
	          if (mark==true) {
	        	  debugger;
	              $(".box").on("mouseover",function(e){

		              var  x = $(this).position().left;
		                console.log(x);
		                $(this).on("mousemove",function(e){
		                  var  x = $(this).position().left;
		                  var clientX = e.clientX;
		                  var offsetX = $(this).offset().left;
		                //  console.log(x+":"+clientX+":"+offsetX);
		                var left = (clientX - offsetX);
		              //  console.log("left"+left);
		                console.log(id.width());
		                var ImgWidth =id.width()/2;

		                    if (left>=ImgWidth) {
		                      //  debugger;
		                        $(".turnNext").css({"display":"block"})
		                        $(".turnPre").css({"display":"none"})
		                    }else{
		                        $(".turnPre").css({"display":"block"})
		                        $(".turnNext").css({"display":"none"})

		                    }
		                })

	              	})
	        	  //debugger;
	                eventBindNext();
	                eventBindPre();

                //  debugger;
                //  console.log($(".box"));


                  debugger;
                  mark = false;

	          }


	        }
	  },1)
	}

  /*
  向左点击
  */

  function eventBindPre(){
   var turnDiv = $("<div class='turnPre turn'>PREV</div>");
   var turnDivNExt = $("<div class='turnNext turn'>PREV</div>");

   //debugger;
   if(index>0){

  	 $("body").find(".model").find(".box").append(turnDiv)
     $(".turnPre").css({"display":"none"})
   }else{
  	 //debugger;
  	// $("body").find(".model").find(".box").find(".turnPre").css({"display":"none"});
  	 $("body").find(".model").find(".box").find(".turnPre").remove();
  	 //console.log($("body").find(".model").find(".box").find(".turnPre"))


   }
   ////console.log($(".turnPre"))

   $(".turnPre").bind("click",function(){
    $(".turn").remove();
    $("body").find(".model").find(".box").find("img").css({opacity:0});

     index--;
     //console.log("--"+index)
      if (index<0) {
        index=4;
        //debugger;

      }

      $.ajax({
  		  type:"POST",
  		  data:{index:index},
  		  url:"getImg.action",
  		  async: false
  	  }).done(function(data){
  		   var html="";
  		  	// //console.log(data);
  		  	var row = data.rows;
  			var dataImg = data.rows[0];
  		  	//console.log(dataImg.name)

  		  	var li = "<img src="+dataImg.name+">";
  		  	$(".wall li").eq(index).html(li)
  		  	// debugger;
  		  	 //console.log($(".wall li").eq(index));
  		  		init(dataImg.name)

  	  	})
          // $(".model").remove();
  	  	// debugger;
         // //console.log("addindx:"+index);
         function init(dataImg){
      	  var theImage = $("img");
             setTimeout(function(){
          	  // debugger;
          	   var imgUp = $(".wall li").eq(index).find("img")
          	   var imgSrc = dataImg;
          	   //console.log(dataImg)

          	   theImage.attr("src",dataImg);
          	   //console.log(theImage)
                 // theImage.src = imgSrc;
                   var theImage2 = new Image();
                   // //console.log(theImage2);
                   theImage2.src = dataImg;

                   var imageWidth = theImage2.width;
                   var imageHeight = theImage2.height;

                   var oWithSize = imgSize[index].width;
                   var oheightSize = imgSize[index].height;
                   var oWithSize2 = imgSize[index+1].width;
                   var oheightSize2 = imgSize[index+1].height;
                 //  debugger;
                   changeSize(oWithSize2,oheightSize2,$("#ImgID"),oWithSize,oheightSize)
             },1000)

         }
   })

  }
/*
向右点击
*/

 function eventBindNext(){


   $(".turn").remove();
       var turnDiv = $("<div class='turnNext turn'>NEXT</div>");
    console.log($(".turn"));
    if (index<=4) {

       $("body").find(".model").find(".box").append(turnDiv)
        $(".turnNext").css({"display":"none"})
    }

    if (index>4) {
      index=0;
    }
    if (index>=4) {
       console.log($("body").find(".model").find(".box").find(".turnNext"));
         $("body").find(".model").find(".box").find(".turnNext").remove();
    }
    $(".turnNext").bind("click",function(){
    	$(".turn").remove();
   	   // $("body").find(".model").find(".box").find("img").css({opacity:0});
      console.log($(".turnNext"));
      $(".turnNext").css({"display":"none"});

      //debugger;
      $(".turnNext turn").css({"display":"none"})
      $("body").find(".model").find(".box").find("img").css({opacity:0});
      //debugger;
       index++


        $.ajax({
    		  type:"POST",
    		  data:{index:index},
    		  url:"getImg.action",
    		  async: false
    	  }).done(function(data){
    		   var html="";
    		  	// //console.log(data);
    		  	var row = data.rows;
    			var dataImg = data.rows[0];
    		  	//console.log(dataImg.name)

    		  	var li = "<img src="+dataImg.name+">";
    		  	$(".wall li").eq(index).html(li)
    		  	 //console.log($(".wall li").eq(index));
    		  		init(dataImg.name)

    	  	})
          //  $(".model").remove();
           //console.log("addindx:"+index);
           function init(dataImg){
         	  var theImage = $("img");
                setTimeout(function(){
             	  // debugger;
             	   var imgUp = $(".wall li").eq(index).find("img")
             	   var imgSrc = dataImg;
             	   console.log(dataImg)

             	   theImage.attr("src",dataImg);
             	   //console.log(theImage)
                    // theImage.src = imgSrc;
                      var theImage2 = new Image();
                      // //console.log(theImage2);
                      theImage2.src = dataImg;

                      var imageWidth = theImage2.width;
                      var imageHeight = theImage2.height;

                      var oWithSize = imgSize[index].width;
                      var oheightSize = imgSize[index].height;
                      var oWithSize2 = imgSize[index-1].width;
                      var oheightSize2 = imgSize[index-1].height;
                    //  debugger;
                      changeSize(oWithSize2,oheightSize2,$("#ImgID"),oWithSize,oheightSize)
                },1000)

            }
     })
}
