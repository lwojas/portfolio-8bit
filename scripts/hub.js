BasicGame.Hub = function (game) {

};

BasicGame.Hub.prototype = {


	create: function () {
		console.log('Hub level loaded'); // Change this call when making a new level
		////////////////////////////////////
		//// Set up background			////
		//// sprites (graphics)			////
		////							////
		////////////////////////////////////

		BasicGame.background = game.add.sprite(0,0, 'sky');
		BasicGame.background.scale.setTo(8,8);
		//BasicGame.background.smoothed = false;

		BasicGame.foreground = game.add.sprite(0,0, 'hubBG');
		BasicGame.foreground.scale.setTo(8,8);


		
		////////////////////////////////////
		//// Set up collision			////
		//// platforms (not visible)	////
		////							////
		////////////////////////////////////

		BasicGame.platforms = game.add.group();
		BasicGame.platforms.enableBody = true;
		BasicGame.platforms.alpha = 0;
		//platforms.renderable = false;

		var ground = BasicGame.platforms.create(0, 3810, 'ground');

		ground.scale.setTo(384, 10);

		ground.body.immovable = true;

		//ground.visible = false;

		var ledge = BasicGame.platforms.create(720, 2984, 'ground');

		ledge.scale.setTo(89, 4);

		ledge.body.immovable = true;


		ledge = BasicGame.platforms.create(1010, 2530, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(85, 25);


		ledge = BasicGame.platforms.create(1210, 2002, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(60, 25);


		ledge = BasicGame.platforms.create(2086, 2525, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(111, 25);

		
		ledge = BasicGame.platforms.create(1209, 2000, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(60, 25);


		ledge = BasicGame.platforms.create(2140, 1478, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(59, 25);


		/*ledge = platforms.create(0, 2654, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(107, 26);


		ledge = platforms.create(0, 2080, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(155, 26);*/


		////////////////////////////////////
		//// Set up player sprite		////
		//// and physics				////
		////							////
		////////////////////////////////////

		BasicGame.player = game.add.sprite(32, game.world.height - 300, 'dude');

		BasicGame.player.scale.setTo(8, 8);

		BasicGame.player.anchor.setTo(.5, 1);

		game.physics.arcade.enable(BasicGame.player);

		BasicGame.player.body.setSize(10, 15, 3 , 1);
		BasicGame.player.body.bounce.y = 0;
		BasicGame.player.body.gravity.y = 550;
		BasicGame.player.body.collideWorldBounds = true;

		BasicGame.player.animations.add('left', [7, 8, 9, 10], 10, true);
		BasicGame.player.animations.add('right', [7, 8, 9, 10], 10, true);
		BasicGame.player.animations.add('idle', [0, 1, 2, 3], 10, true);

		game.camera.follow(BasicGame.player); // Set the player sprite as the focus

		
		BasicGame.door = [
			new BasicGame.WarpPortal(game, 2488, 1367, BasicGame.player, 0, 'star', 'sign'),
			new BasicGame.WarpPortal(game, 1532, 1881, BasicGame.player, 1, 'star', 'sign')
		];

		BasicGame.fullScreenMessage = new BasicGame.uiMessage(
			game, 
			BasicGame.player, 
			'bigMessageBox', 
			BasicGame.textData.welcome, 
			true,
			false,
			'smallMessage',
			'defaultCollisionBox',
			700,
			3640
		);


		/*var style = { 

			font: '250px Press Start 2P', fill: "#fff",
			align: "left",
			boundsAlignH: "left", 
        	boundsAlignV: "top", 
        	wordWrap: true, 
        	wordWrapWidth: 300
		
		}

		BasicGame.title = game.add.text(300, 3305, BasicGame.textData.titles[0], style);
		BasicGame.title.setTextBounds(16, 16, 768, 568);
		BasicGame.title.alpha = .5;*/
		//BasicGame.title.anchor.setTo(0.5);
		//BasicGame.title.smoothed = false;

		game.world.bringToTop(BasicGame.player);
		

		/*BasicGame.door = game.add.group();
		BasicGame.door.enableBody = true;

		var warpGate = BasicGame.door.create(2488, 1367, 'star'); // Add car sprite in front of all sprites
		warpGate.scale.setTo(4, 4);*/
		

		////////////////////////////////////
		//// Set up UI buttons for		////
		//// mobile						////
		////							////
		////////////////////////////////////

		BasicGame.uiButtons = game.add.group();
		BasicGame.uiButtons.alpha = .4;

		BasicGame.uiButtonleft = game.add.button(80, 550, 'button-left', null, this, 1, 0, 1, 0);  // Frame numbers correspond to up , down and over states for the button
		BasicGame.uiButtonleft.scale.setTo(8,8);
	    BasicGame.uiButtonleft.fixedToCamera = true;
	    BasicGame.uiButtonleft.events.onInputOver.add(function(){BasicGame.leftTouch=true;});
	    BasicGame.uiButtonleft.events.onInputOut.add(function(){BasicGame.leftTouch=false;});
	    BasicGame.uiButtonleft.events.onInputDown.add(function(){BasicGame.leftTouch=true;});
	    BasicGame.uiButtonleft.events.onInputUp.add(function(){BasicGame.leftTouch=false;});
	    BasicGame.uiButtons.add(BasicGame.uiButtonleft);

	    BasicGame.uiButtonright = game.add.button(300, 550, 'button-right', null, this, 1, 0, 1, 0);  
	    BasicGame.uiButtonright.scale.setTo(8,8);
	    BasicGame.uiButtonright.fixedToCamera = true;
	    BasicGame.uiButtonright.events.onInputOver.add(function(){BasicGame.rightTouch=true;});
	    BasicGame.uiButtonright.events.onInputOut.add(function(){BasicGame.rightTouch=false;});
	    BasicGame.uiButtonright.events.onInputDown.add(function(){BasicGame.rightTouch=true;});
	    BasicGame.uiButtonright.events.onInputUp.add(function(){BasicGame.rightTouch=false;});
	    BasicGame.uiButtons.add(BasicGame.uiButtonright);

	    BasicGame.uiButtonjump = game.add.button(1040, 550, 'button-A', null, this, 1, 0, 1, 0);
	    BasicGame.uiButtonjump.scale.setTo(8,8); 
	    BasicGame.uiButtonjump.fixedToCamera = true;
	    BasicGame.uiButtonjump.events.onInputOver.add(function(){BasicGame.jumpTouch=true;});
	    BasicGame.uiButtonjump.events.onInputOut.add(function(){BasicGame.jumpTouch=false;});
	    BasicGame.uiButtonjump.events.onInputDown.add(function(){BasicGame.jumpTouch=true; BasicGame.interactTouch = false});
	    BasicGame.uiButtonjump.events.onInputUp.add(function(){BasicGame.jumpTouch=false; BasicGame.interactTouch = true});
	    BasicGame.uiButtons.add(BasicGame.uiButtonjump);

	},


	update: function () {

		//console.log('update has fired');

		BasicGame.background.x = game.camera.x*0.1;
		var hitPlatform = game.physics.arcade.collide(BasicGame.player, BasicGame.platforms);
		//var hitPickup = game.physics.arcade.collide(BasicGame.player, BasicGame.door); // This sets the player to collide against the collision platforms
		BasicGame.gp = game.input.gamepad.pad1;
		BasicGame.player.body.velocity.x = 0;

		BasicGame.fullScreenMessage.update();

		if (!BasicGame.GameIsPaused) {  // Pause player movement and interaction if needed.

			
			// Run the portal update function that checks for collision with the player
			for (var i = 0; i < BasicGame.door.length; i++) {
				BasicGame.door[i].update();
			}

			/*if (hitPickup) {
				console.log('door collision is is working');
				BasicGame.platforms.destroy();
				game.state.start('Hub');
			}*/

			if ( BasicGame.facingRight ) {

				BasicGame.player.scale.x = 8;

			} else {

				BasicGame.player.scale.x = -8;
			}

			if (BasicGame.gp.isDown(Phaser.Gamepad.BUTTON_14) || BasicGame.leftKey.isDown || (BasicGame.leftTouch)) {

				BasicGame.facingRight = false;
					
				BasicGame.player.body.velocity.x = -400;

				if (!BasicGame.isJumping) {
					BasicGame.player.animations.play('left');
				};

			} else if (BasicGame.gp.isDown(Phaser.Gamepad.BUTTON_15) || BasicGame.rightKey.isDown || (BasicGame.rightTouch)) {

				BasicGame.facingRight = true;
					
				BasicGame.player.body.velocity.x = 400;

				if (!BasicGame.isJumping) {
					BasicGame.player.animations.play('right');
				};

			} else {
				if (!BasicGame.isJumping) {
					// player.animations.stop();
					// player.frame = 4;

					BasicGame.player.animations.play('idle');
				};
			};

			if (BasicGame.gp.isDown(Phaser.Gamepad.BUTTON_0) || BasicGame.controlKey.isDown || (BasicGame.jumpTouch) && BasicGame.player.body.touching.down && hitPlatform) {
				BasicGame.isJumping = true;
				BasicGame.player.body.velocity.y = -550;
				BasicGame.player.animations.stop();
				BasicGame.player.frame = 10;
			} else if (BasicGame.player.body.touching.down && hitPlatform) {
				BasicGame.isJumping = false;
			};

		};

	},

	render: function() {
			//game.debug.text(game.time.fps, 2, 14, "#00ff00");
			//game.debug.body(BasicGame.player);
			//game.debug.geom(ground,'#0fffff');
			//game.debug.cameraInfo(game.camera, 16, 16);
	}
};


