BasicGame.Level2 = function (game) {

};

BasicGame.Level2.prototype = {


	create: function () {
		console.log('Level 2 loaded');
		//BasicGame.door = null;

		////////////////////////////////////
		//// Set up background			////
		//// sprites (graphics)			////
		////							////
		////////////////////////////////////

		BasicGame.background = game.add.sprite(0,0, 'sky');
		BasicGame.background.scale.setTo(8,8);
		//BasicGame.background.smoothed = false;

		BasicGame.foreground = game.add.sprite(0,0, 'foreground');
		BasicGame.foreground.scale.setTo(8,8);


		
		////////////////////////////////////
		//// Set up collision			////
		//// platforms (not visible)	////
		////							////
		////////////////////////////////////

		BasicGame.platforms = game.add.group();
		BasicGame.platforms.enableBody = true;
		platforms.alpha = 0;
		//platforms.renderable = false;

		var ground = BasicGame.platforms.create(0, 3810, 'ground');

		ground.scale.setTo(384, 10);

		ground.body.immovable = true;

		//ground.visible = false;

		var ledge = BasicGame.platforms.create(1720, 3512, 'ground');

		ledge.scale.setTo(50, 25);

		ledge.body.immovable = true;


		ledge = BasicGame.platforms.create(1848, 3384, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(24, 25);


		ledge = BasicGame.platforms.create(0, 3232, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(150, 25);


		ledge = BasicGame.platforms.create(1432, 2867, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(35, 25);


		ledge = BasicGame.platforms.create(2160, 2937, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(87, 2);


		ledge = BasicGame.platforms.create(1865, 2432, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(197, 25);


		ledge = BasicGame.platforms.create(0, 2654, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(107, 26);


		ledge = BasicGame.platforms.create(0, 2080, 'ground');

		ledge.body.immovable = true;

		ledge.scale.setTo(155, 26);


		////////////////////////////////////
		//// Set up player sprite		////
		//// and physics				////
		////							////
		////////////////////////////////////

		BasicGame.door =  [
			new BasicGame.WarpPortal(game, 3500, 3650, BasicGame.player, 0, 'star', 'sign')
		];

		BasicGame.player = game.add.sprite(320, game.world.height - 300, 'dude');

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

		game.camera.follow(BasicGame.player); // Set the player sprite as the focus for the camera

		var roxieCar = game.add.sprite(200, 457, 'car'); // Add car sprite in front of all sprites


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
	    BasicGame.uiButtonjump.events.onInputDown.add(function(){BasicGame.jumpTouch=true;});
	    BasicGame.uiButtonjump.events.onInputUp.add(function(){BasicGame.jumpTouch=false;});
	    BasicGame.uiButtons.add(BasicGame.uiButtonjump);

	},

	update: function () {

		//console.log('update has fired');

		BasicGame.background.x = game.camera.x*0.1;
		var hitPlatform = game.physics.arcade.collide(BasicGame.player, BasicGame.platforms); // This sets the BasicGame.player to collide against the collision platforms
		BasicGame.gp = game.input.gamepad.pad1;
		BasicGame.player.body.velocity.x = 0;
		if (!BasicGame.GameIsPaused) {

			BasicGame.door[0].update();

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
					// BasicGame.player.animations.stop();
					// BasicGame.player.frame = 4;

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
			game.debug.text(game.time.fps, 2, 14, "#00ff00");
			//game.debug.body(BasicGame.player);
			//game.debug.geom(ground,'#0fffff');
			//game.debug.cameraInfo(game.camera, 16, 16);
	}

};