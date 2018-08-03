function DateObj(){

	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOVer = false;
	this.alpha = 0;
}
DateObj.prototype.reset = function(){

	this.fruit = 0;
	this.double = 1;
}
DateObj.prototype.draw = function(){

	cxt1.save()
	cxt1.shadowBlur = 10;
	cxt1.shadowColor = 'white'
	var w = oCanvas1.width;
	var h = oCanvas1.height;
	cxt1.fillStyle = 'white';
	cxt1.font = '20px Verdana'
	cxt1.textAlign = 'center'
	cxt1.fillText('score:'+this.score,w*0.5,h-80);
	cxt1.restore()

	cxt1.save()
	cxt1.font = '100px Verdana'
	cxt1.fillStyle = 'white';
	cxt1.textAlign = 'center'
	cxt1.shadowBlur = 30;
	cxt1.shadowColor = 'white'
	if (this.gameOver)
	{	this.alpha+=deltaTime*0.0005;
		if (this.alpha>1)
		{
			this.alpha = 1;
		}
		cxt1.fillStyle = 'rgba(255,255,255,'+this.alpha+')';
		cxt1.fillText('GAME OVER',w*0.5,h*0.5);
	}
	cxt1.restore()
}
DateObj.prototype.addScore = function(){

	this.score +=this.fruitNum*100*this.double;
	this.fruitNum = 0
	this.double =  1
}