const palettes = [[[237,102,53],[253,186,19],[69,89,135]],[[137, 243, 255],[62, 84, 232],[33, 35, 84]], [[218,165,32],[84, 106, 118],[247, 237, 240]]];

// const gui = createGui('My awesome GUI');

// let noiseScale = 1500;
// let noiseScaleMin = 50;
// let noiseScaleMax = 5000;
// let noiseScaleStep = 10;
// gui.addGlobals('nums');

let particles_a = [];
let particles_b = [];
let particles_c = [];

let num = 1500;
let noiseScale = 500;

let radius = 300;

let color1;
let color2;
let color3;


function setup(){
	createCanvas(720, 720);
	background(100);
	fill(0, 0, 33);
	noStroke();
	rect(0,0,width,height);
	for(let i = 0; i < nums; i++){
		let padding = width/2-radius;
		particles_a[i] = new Particle(random(padding, width-padding),random(padding,height-padding));
		particles_b[i] = new Particle(random(padding, width-padding),random(padding,height-padding));
		particles_c[i] = new Particle(random(padding, width-padding),random(padding,height-padding));
	}
	let a = int(random(0,palettes.length));
	//print(a);
	let palette = palettes[a];
	color1 = palette[0];
	color2 = palette[1];
	color3 = palette[2];
	
}

function draw(){
	// noStroke();
	smooth();
		for(let i = 0; i < nums; i++){
		let sz = map(i,0,nums,1,2);
		let alpha = map(i,0,nums,0,250);

		fill(color1[0],color1[1],color1[2],alpha);
		particles_a[i].move();
		particles_a[i].checkEdge(radius);
		particles_a[i].display(sz);


		fill(color2[0],color2[1],color2[2],alpha);
		particles_b[i].move();		
		particles_b[i].checkEdge(radius);
		particles_b[i].display(sz);


		fill(color3[0],color3[1],color3[2],alpha);
		particles_c[i].move();
		particles_c[i].checkEdge(radius);
		particles_c[i].display(sz);

	}  
	// noFill();
	// strokeWeight(1);
	// stroke(255);
	// ellipse(width /2, height /2, radius * 2 + 1)
	// rotate(PI / 2);
	// ellipse(width /2, height /2, radius * 2 + 50,10)
}


function Particle(x, y, r){
	this.dir = createVector(0, 0);
	this.vel = createVector(0, 0);
	this.pos = createVector(x, y);
	this.speed = 0.4;

	//balf in mouf

	this.move = function(){
		let angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	this.checkEdge = function(radious){
		if (dist(width / 2, height / 2, this.pos.x, this.pos.y) > radius) {
			let angle = Math.random()*Math.PI*2;
      this.pos.x = cos(angle)*radius+width/2;
			this.pos.y = sin(angle)*radius+height/2;
		}
	}

	this.display = function(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}

function keyPressed(){
	if(key === 's') save();
}