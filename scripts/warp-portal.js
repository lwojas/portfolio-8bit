//////////////////////////////////////////////////
//////////////////////////////////////////////////
///////
///////		Warp Portal object class
///////		-	Triggers a level (state) change	
///////			on contact with the player
///////		-	Note: this object has no physics 
///////			attached to it's sprite by default
///////
//////////////////////////////////////////////////

BasicGame.WarpPortal = function (game, x, y, player, destIndex, imageForSprite, imageForEmitter) {

	this.game = game;
	this.player = player;
	this.destIndex = destIndex;

	this.sprite = game.add.sprite(x,y, imageForSprite); // Use the function argument to choose the image
	//this.portalSprite.scale.setTo(4, 4);

	//// Add and emiter to the spawned object
	/////////////////////////////////////////
	this.emitter = game.add.emitter(x+20, y+20, 2); // this puts the emitter inside the sprite obect by 20px;
	this.emitter.width = 50;
	this.emitter.makeParticles(imageForEmitter); // Use the function argument to choose the image
	this.emitter.setAlpha(0.3, 0.8);
	this.emitter.setRotation(0, 0);
	this.emitter.minParticleSpeed.set(-100, -75);
    this.emitter.maxParticleSpeed.set(-50,-100);
	//this.emitter.gravity = 0;
	this.emitter.start(false, 1000, 1);
	//this.emitter.on = false;


	this.hitPickup;
	
	//// Enable arcade physics?
	////////////////////////////////////////////////////////

	//game.physics.enable(this.portalSprite, Phaser.Physics.ARCADE);
	//this.portalSprite.body.immovable = true;

};

BasicGame.WarpPortal.prototype.update = function() {
	//console.log('object update function has fired');
	//this.hitPickup = game.physics.arcade.collide(this.player, this.portalSprite);
	this.hitPickup = Phaser.Rectangle.intersects(this.player, this.sprite);
	//console.log(this.destIndex);
	if (this.hitPickup) {
		console.log(this.destIndex);
		//BasicGame.door.destroy();
		game.state.start(BasicGame.portalIndex[this.destIndex]);
		//this.destroy();
	};
	
	//// Use this to set a proximity action
	////////////////////////////////////////
	var distanceX = this.sprite.x - this.player.x;
	var distanceY = this.sprite.y - this.player.y;
	if (distanceX <= 300 && distanceX >= -300 && distanceY <= 500 && distanceY >= -500) {
		this.emitter.on = true;
	} else {
		this.emitter.on = false;
	};
};




