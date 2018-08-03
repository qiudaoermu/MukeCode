	
	function Ane(){

		this.rootx = [];
		this.headx = [];
		this.heady = [];
		this.alpha = 0;
		this.amp = [];
		
	}
	Ane.prototype.num = 50;
	Ane.prototype.init = function(){
		
		for (var i=0;i<this.num ;i++ )
		{
			this.rootx[i]  = i*16+Math.random()*20;
			this.headx[i] = this.rootx[i]
			this.heady[i] = canHeight -250+ Math.random()*50;
			this.amp[i] = Math.random()*50+50
			
		}
	}
	Ane.prototype.draw = function(){
		this.alpha+=deltaTime*0.0006;
		var l = Math.sin(this.alpha)
		cxt2.save()
		cxt2.globalAlpha=0.6;
		cxt2.lineWidth=20;
		cxt2.lineCap='round';
		cxt2.strokeStyle="#7c2fa3";

		for (var i=0;i<this.num ;i++ )
		{	
			cxt2.beginPath();
			cxt2.moveTo(this.rootx[i],canHeight);
			this.headx[i] = this.rootx[i]+l*this.amp[i]
			cxt2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i])
			cxt2.stroke()

		}
		
	
		cxt2.restore()
	}