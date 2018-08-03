

	
	var lastTime
	var deltaTime
	var canWidth
	var canHeight
	var cxt2
	var cxt1 
	var oCanvas2
	var oCanvas1
	var img
	var ane
	var fruit
	var mom
	var baby
	var big
	var mx
	var my
	var babyTail = []
	var babyEye = []
	var babyBody = []
	var momTail = []
	var momEye = []
	var date
	var momBodyOra = []
	var momBodyBlue = []
	var wave;
	var hale;
	var dust;
	var dustPic = []
	document.body.onload = game;
	function game(){
		deltaTime=0
		lastTime=new Date()
		init()
		gameloop()
	}

	function init(){
		
		
		
		oCanvas1 = document.getElementById('canvas1')

		cxt1 = oCanvas1.getContext("2d");
		oCanvas1.addEventListener('mousemove',onMouseMove,false)
		oCanvas2 = document.getElementById('canvas2')
		cxt2 = oCanvas2.getContext("2d");

		
		canWidth = oCanvas1.width;
		canHeight = oCanvas1.height;
		img = new Image()
		img.src='./images/background.jpg';
		
		ane = new Ane()//海藻
		ane.init()

		fruit = new Fruit()//果实
		fruit.init()
	
		mom = new Mom()
		mom.init()

		baby = new babyObj();
		baby.init()
		mx = canWidth*0.5;
		my = canHeight*0.5
		for (var i=0;i<8;i++ )
		{
			babyTail[i] = new Image();
			babyTail[i].src = './images/babyTail'+i+'.png'
		}

		for (var i=0;i<20;i++ )
		{
			babyBody[i] = new Image();
			babyBody[i].src = './images/babyFade'+i+'.png'
		}

		for (var i=0;i<2 ;i++ )
		{
			babyEye[i] = new Image()
			babyEye[i].src='./images/babyEye'+i+'.png'
		}
		for (var i=0;i<2 ;i++ )
		{
			 momEye[i] = new Image()
			 momEye[i].src = './images/bigEye'+i+'.png'


		}
		for (var i=0;i<8 ;i++ )
		{
			momTail[i] = new Image();
			momTail[i].src = './images/bigTail'+i+'.png';
		}
		date = new DateObj()	

		for (var i=0;i<8 ;i++ )
		{
			momBodyOra[i] = new Image();
			momBodyBlue[i] = new Image();
			momBodyOra[i].src = './images/bigSwim'+i+'.png'
			momBodyBlue[i].src = './images/bigSwimBlue'+i+'.png'
		}

		wave = new Waveobj()
		
		wave.init()
		hale = new Haleobj()
		hale.init()
		for (var i=0;i<7 ;i++ )
		{
			dustPic[i] = new Image();
			dustPic[i].src = './images/dust'+i+'.png'
		}
		dust = new Dust();
		dust.init()
	}

	function gameloop(){
	
		window.requestAnimFrame(gameloop)
		var now = Date.now();
		deltaTime = now-lastTime;
		
		lastTime = now;
		drawBackground()
			
		ane.draw()
		sendFruit()
		
		fruit.draw()//画水果
		cxt1.clearRect(0,0,canWidth,canHeight)
		mom.draw()
		momFruitsCollision()
		baby.draw()
		momCollision()

		date.draw();
		wave.draw();
		hale.draw()
		dust.draw()
		
	}
	function onMouseMove(e){
		if (!date.gameOver)
		{  
			if (e.offSetX||e.layerX)
			{
				mx = e.offSetX ==undefined?e.layerX:e.offSetX;
				my = e.offSetY ==undefined?e.layerY:e.offSetY;
				
			}
		}
		
	}


	