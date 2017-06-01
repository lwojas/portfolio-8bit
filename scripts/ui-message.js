BasicGame.uiMessage = function ( game, player, imageForSprite, textToShow, autoStart, IsActive, imageForSignPost, collisionImage, x, y) {

	//// Set default properties for this object
	/////////////////////////////////////////////
	this.messageArray = textToShow;
	this.game = game;
	this.player = player;
	this.count = 0;
	this.autoStart = autoStart;
	this.active = IsActive;
	this.keyIsDown = false;
	this.hitArea;

	this.sprite = game.add.sprite(1220,170, imageForSprite);
	this.sprite.fixedToCamera = true;
	this.sprite.anchor.setTo(1 , .5);
	this.sprite.scale.setTo(1, .1);
	this.sprite.alpha = 0;

	this.collisionSprite = game.add.sprite(x,y, collisionImage);
	this.collisionSprite.alpha = 0;

	this.signPostSprite = game.add.sprite(this.collisionSprite.x+144, this.collisionSprite.y+32, imageForSignPost);
	this.signPostSprite.alpha = 0;

	this.style = { 
		font: '30px Press Start 2P', fill: '#113504',
		align: "left",
		boundsAlignH: "left", 
        boundsAlignV: "top", 
        wordWrap: true, 
        wordWrapWidth: 1040
	}

	this.text = game.add.text(0, 0, this.messageArray[0], this.style);
	this.text.setTextBounds(150, 70, 1155, 240);
	this.text.fixedToCamera = true;
	this.text.alpha = 0;

	this.tweenA = game.add.tween(this.sprite.scale).to( { x:1, y:1 }, 500, "Quart.easeOut");
	this.tweenB = game.add.tween(this.sprite).to( {alpha:1}, 300, "Quart.easeOut");
	this.tweenC = game.add.tween(this.text).to({alpha:1}, 300, "Quart.easeOut");
	this.tweenD = game.add.tween(this.sprite.scale).to( { x:1, y: .5 }, 500, "Quart.easeOut");
	this.tweenE = game.add.tween(this.sprite).to( {alpha:0}, 400, "Quart.easeOut");
	this.tweenF = game.add.tween(this.signPostSprite).to({alpha:1}, 800, "Quart.easeOut");
	this.tweenG = game.add.tween(this.signPostSprite).to({alpha:0}, 800, "Quart.easeOut");
	this.tweenA.chain(this.tweenC);


	//// Autostart the message
	/////////////////////////////////////////////
	if (autoStart) {
		game.time.events.add(Phaser.Timer.SECOND * 2, autoStartMessage, this);
	};
	
	function autoStartMessage() {
		this.tweenA.start();
		this.tweenB.start();
		this.active = true;
		BasicGame.GameIsPaused = true;
	};
	
	
};

BasicGame.uiMessage.prototype.update = function() {

	this.hitArea = Phaser.Rectangle.intersects(this.player, this.collisionSprite);

	if (!this.active) {
		if (this.hitArea) {
			//console.log('hit area active');
			this.tweenF.start();
			if 	(BasicGame.controlKey.duration > 21 && BasicGame.controlKey.duration < 40 || 
				(BasicGame.gp.justPressed(Phaser.Gamepad.BUTTON_0)) ||
				(BasicGame.interactTouch)) {
					this.tweenA.start();
					this.tweenB.start();
					this.active = true;
					BasicGame.GameIsPaused = true;
					this.count = 0;
			};
		} else {
			this.tweenG.start();
		};
	}

	if (this.active) { 
	//console.log(BasicGame.interactTouch);
	//console.log(BasicGame.jumpTouch);
		if (BasicGame.gp.isDown(Phaser.Gamepad.BUTTON_0) || BasicGame.controlKey.isDown || (BasicGame.jumpTouch)) {

			if (this.messageArray.length === 1) {
				this.text.destroy();
				this.sprite.destroy();
				BasicGame.GameIsPaused = false;
			} else if (BasicGame.controlKey.duration > 10 && BasicGame.controlKey.duration < 20 || 
					  (BasicGame.gp.justPressed(Phaser.Gamepad.BUTTON_0)) ||
					  (BasicGame.interactTouch)) { // This needs fixing
							BasicGame.interactTouch = false;
							if (this.count < this.messageArray.length) {
								this.count++;
								console.log(this.count);
								this.text.alpha = 0;
								if (this.count < this.messageArray.length) {
									this.text.setText(this.messageArray[this.count]);
									console.log('this has fired');
									this.tweenC.start();
								};
							};
			};

			if (this.messageArray.length === this.count) {
				//console.log('last if statement reached');
				this.tweenD.start();
				this.tweenE.start();
				BasicGame.GameIsPaused = false;
				//this.active = false;
				game.time.events.add(Phaser.Timer.SECOND*2, resetCount, this);
				if (this.autoStart) {
					game.time.events.add(Phaser.Timer.SECOND* .5, cleanUp, this);
					//this.sprite.destroy();
				};
			};

			function resetCount() {
				this.count = 0;
				console.log(this.count);
			}


			function cleanUp() {
				this.sprite.destroy();
				this.text.destroy();
				
			};
		
		};
	};

	

};