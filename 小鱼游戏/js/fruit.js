	
	
	function Fruit(){
		this.x =[];
		this.y = [];
		this.alive = [];
		this.l = [];
		this.p = [];
		this.orange = new Image();
		this.blue = new Image();
		this.fruitType = [];
		this.aneNO = []
		
	}
	Fruit.prototype.num = 50;
	Fruit.prototype.init = function(){
		for (var i=0;i<this.num ;i++ )
		{
			
			this.aneNO[i] = 0;
			this.alive[i] = false;
			this.x[i]=1;
			this.y[i]=0;
			this.l[i]=0;
			this.p[i]=Math.random()*0.017+0.003;
			this.fruitType[i]='';
			
			
		}
		this.orange.src = './images/fruit.png'
		this.blue.src = './images/blue.png';
	}
	Fruit.prototype.draw = function(){
		if (deltaTime>=17)
		{deltaTime=17
		}
		for (var i=0;i<this.num ;i++ )
		{	
			if (this.alive[i])
			{
				if (this.fruitType[i]=='blue')
				{
					var pic = this.blue
				}else{
					
					var pic = this.orange	
					
				}
			
//				this.l[i] += deltaTime*this.p[i];
				
				if (this.l[i]<=14)
				
				{	
					var NO = this.aneNO[i]
					this.x[i] = ane.headx[NO]
					this.y[i] = ane.heady[NO]
					this.l[i] += this.p[i]*deltaTime;
					
				}else
				{

					this.y[i]-=this.p[i]*deltaTime*7;
				
				}
				cxt2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i])
				
				if (this.y[i]<10)
				{
					this.alive[i]=false
				}
				
			}
		
		
		}
	}
	var arr=[]
		for (var j=0;j<30 ;j++ )
		{
			arr[j]=j
		}
	Fruit.prototype.born = function(i){
		
		
	

		this.aneNO[i] = Math.floor(Math.random()*arr.length)

		this.l[i]=0;
		this.alive[i]=true;
		var ran = Math.random();
		if (ran<0.1)
		{
			this.fruitType[i]='blue'
		}else{
		
			this.fruitType[i]='orange'
			
		}
	
		
	}
	Fruit.prototype.dead = function(i)
	{
		console.log(1)
		this.alive[i] = false
	}



//	function fruitMonitor(){
//	
//		var num=0;
//		
//		for (var i=0;i<fruit.num ;i++ )
//		{
//			if (fruit.alive[i])num++
//		}
//		console.log(num)
//		if (num<15)
//		{
//			sendFruit()
//			return
//		}
//	}
	function sendFruit(){
	
		for (var i=0;i<fruit.num ;i++ )
		{
			if (!fruit.alive[i]||i>=15)
			{	
				fruit.born(i)
					
				return;
			}
		}
	}