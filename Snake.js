let sn;
let food;
let rows = 30;
let size;
let dir;

function setup() {
	createCanvas(600,600);
	stroke(100);
	strokeWeight(size/20);
	frameRate(15);

	//textFont(fontBold);

	dir = 0;
	size = height/rows;
	sn = []
	sn[0] = createVector(floor(rows*1/5), floor(rows/2-1));
	makeFood();
	loop();
}

function draw() {
	background(50);
	show();
	updateSN();
	eat();
	endgame();
}


////////////////////////////////


makeFood = function() {
	food = createVector(floor(random(0, rows)), floor(random(0, rows)));
}


show = function() {
	fill(50,255,50);
	square(food.x*size, food.y*size, size, size/12);

	fill(255);
	square(sn[0].x*size, sn[0].y*size, size, size/12);
	fill(175);
	for(i=1; i<sn.length; i++) {
	square(sn[i].x*size, sn[i].y*size, size, size/12);
	}

	textSize(size);
	text('Score: '+(sn.length-1),size,size*1.5);
}


updateSN = function() {
	for(i=sn.length-1; i>0; i--) {
		sn[i] = sn[i-1].copy();
	}
	
	switch(dir) {
		case 1:
			sn[0].x--;
			break;
		case 2:
			sn[0].y++;
			break;
		case 3:
			sn[0].x++;
			break;
		case 4:
			sn[0].y--;
			break;
	}
}


eat = function() {
	if(sn[0].equals(food)) {
		makeFood();
		sn[sn.length] = sn[sn.length-1].copy();
	}
}



endgame = function() {
	let dead = false;
	for(i=2; i<sn.length; i++)
		if(sn[0].equals(sn[i]))
			dead = true;

	if(dead || sn[0].x<0 || sn[0].x>rows-1 || sn[0].y<0 || sn[0].y>rows-1) {
		textSize(size*3);
		noStroke();
		fill(255,0,0, 150);
		text('Game Over',(rows-16)*size/2, rows*size/2);
		textSize(size);
		text('click SPACE to restart',(rows-10)*size/2, (rows+2)*size/2);
		noLoop();
	}

} 


function keyPressed() {
	if(keyCode === LEFT_ARROW || keyCode == 65 && dir!=3)
		dir = 1;
	if(keyCode === DOWN_ARROW || keyCode == 83 && dir!=4)
		dir = 2;
	if(keyCode === RIGHT_ARROW || keyCode == 68 && dir!=1)
		dir = 3;
	if(keyCode === UP_ARROW || keyCode == 87 && dir!=2)
		dir = 4;

	if(keyCode === 32)
		setup();
}