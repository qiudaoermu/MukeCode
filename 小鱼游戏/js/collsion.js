function momFruitsCollision()
{

	if (!date.gameOver)
	{
	
		for (var i=0;i<fruit.num ;i++ )
		{
			if (fruit.alive[i])
			{			
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
				if (l<900)
				{
					fruit.dead(i)
					date.fruitNum++;
					mom.momBodyCount++;
					if (mom.momBodyCount>7)
					{
						mom.momBodyCount =7
					}
					if (fruit.fruitType[i]=='blue')
					{
						date.double = 2;
					}
					wave.born(fruit.x[i],fruit.y[i]);

				}
			}
		}
	}
}
function momCollision(){
	if (date.fruitNum>0&&!date.gameOver)
	{	
		var l = calLength2(mom.x,mom.y,baby.x,baby.y) 
		if (l<900)
		{
			//baby recover
			baby.babyBodyCount = 0;
			date.reset()
			mom.momBodyCount = 0;
			//score.update
			date.addScore()
			hale.born(baby.x,baby.y)
		}
	}
}