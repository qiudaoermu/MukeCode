function Waveobj(){
	
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];

}
Waveobj.prototype.num=10;
Waveobj.prototype.init = function(){

	for (var i=0;i<this.num ;i++ )
	{
		this.alive[i] = false;
		this.r[i] = 0;

	}

}
Waveobj.prototype.draw = function(){
	cxt1.save()
	cxt1.lineWidth = 2;
	cxt1.shadowBlur = 10;
		cxt1.shadowColor = '#fff'

	for (var i=0;i<this.num ;i++ )
	{
		if (this.alive[i])
		{
			//draw
			//api
			this.r[i]+=deltaTime*.04;
			if (this.r[i]>50)
			{
				this.alive[i]= false;
				break;
			}
			var alpha = 1-this.r[i]/100;
			cxt1.beginPath();
			cxt1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2)
			cxt1.closePath();
			cxt1.strokeStyle='rgba(255,255,255,'+alpha+')';
			cxt1.stroke();
		}
	}
	cxt1.restore()

}
Waveobj.prototype.born = function(x,y){

	for (var i=0;i<this.num ;i++ )
	{
		if (!this.alive[i])
		{
			
			this.alive[i] = true;
			this.x[i] = x;
			this.y[i] =y;
			this.r[i] = 0;
			return;
		}
	}

}