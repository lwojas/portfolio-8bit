navigator.gamepadInputEmulation = "gamepad"; // MS Edge flag - not sure if it is needed

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update, render: render });

function init() {
	//Phaser.Canvas.setImageRenderingCrisp(game.canvas); // this is now redundant
	game.stage.smoothed = false;
}

function preload() {
	game.load.image('sky', 'assets/background.png');
	game.load.image('foreground', 'assets/foreground.png');
	game.load.image('ground', 'assets/collision.png');
    game.load.image('platform', 'assets/platform2.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/hero2.png', 16, 16);
    game.load.image('car', 'assets/car.png');
    game.load.image('sign', 'assets/sign.png');
    game.load.spritesheet('button-left', 'assets/touch_controls_left.png', 20, 17);
    game.load.spritesheet('button-right', 'assets/touch_controls_right.png', 20, 17);
    game.load.spritesheet('button-A', 'assets/touch_controls_A.png', 20, 17);
}

var platforms;
var player;
var uiMessage;
var scoreText;
var speechBubble;
var gp; 
var hasGP = true;
var facingRight = true;
var uiButtons;
var leftKey;
var rightKey;
var leftTouch = false;
var rightTouch = false;
var jumpTouch = false;
var controlKey;
var isJumping = false;

function create() {
	
	////////////////////////////////////
	//// Set up game and inputs		////
	////							////
	////							////
	////////////////////////////////////

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Scale the canvas to fit the whole window

	game.world.setBounds(0, 0, 3840, 4000); // Se the size of the game level - this is not the size of the camera

	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP); 		// Log the keyboard keystrokes to variables
	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

	controlKey = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL); // jump action

	game.input.gamepad.start(); // Start the gamepad input
	
	game.time.advancedTiming = true;
	game.physics.startSystem(Phaser.Physics.ARCADE);


	////////////////////////////////////
	//// Set up background			////
	//// sprites (graphics)			////
	////							////
	////////////////////////////////////

	parallax1 = game.add.sprite(0,0, 'sky');
	parallax1.scale.setTo(8,8);
	//parallax1.smoothed = false;

	foreground = game.add.sprite(0,0, 'foreground');
	foreground.scale.setTo(8,8);


	platforms = game.add.group();
	platforms.enableBody = true;
	//platforms.alpha = 1;
	//platforms.renderable = false;


	////////////////////////////////////
	//// Set up collision			////
	//// platforms (not visible)	////
	////							////
	////////////////////////////////////

	var ground = platforms.create(0, 3810, 'ground');

	ground.scale.setTo(384, 10);

	ground.body.immovable = true;

	//ground.visible = false;

	var ledge = platforms.create(1720, 3512, 'ground');

	ledge.scale.setTo(50, 25);

	ledge.body.immovable = true;


	ledge = platforms.create(1848, 3384, 'ground');

	ledge.body.immovable = true;

	ledge.scale.setTo(24, 25);


	ledge = platforms.create(0, 3232, 'ground');

	ledge.body.immovable = true;

	ledge.scale.setTo(150, 25);


	ledge = platforms.create(1432, 2867, 'ground');

	ledge.body.immovable = true;

	ledge.scale.setTo(35, 25);


	ledge = platforms.create(2160, 2937, 'ground');

	ledge.body.immovable = true;

	ledge.scale.setTo(87, 2);


	ledge = platforms.create(1865, 2432, 'ground');

	ledge.body.immovable = true;

	ledge.scale.setTo(197, 25);


	ledge = platforms.create(0, 2654, 'ground');

	ledge.body.immovable = true;

	ledge.scale.setTo(107, 26);


	ledge = platforms.create(0, 2080, 'ground');

	ledge.body.immovable = true;

	ledge.scale.setTo(155, 26);


	////////////////////////////////////
	//// Set up player sprite		////
	//// and physics				////
	////							////
	////////////////////////////////////

	player = game.add.sprite(32, game.world.height - 300, 'dude');

	player.scale.setTo(8, 8);

	player.anchor.setTo(.5, 1);

	game.physics.arcade.enable(player);

	player.body.setSize(10, 15, 3 , 1);
	player.body.bounce.y = 0;
	player.body.gravity.y = 550;
	player.body.collideWorldBounds = true;

	player.animations.add('left', [7, 8, 9, 10], 10, true);
	player.animations.add('right', [7, 8, 9, 10], 10, true);
	player.animations.add('idle', [0, 1, 2, 3], 10, true);

	

	var roxieCar = game.add.sprite(200, 457, 'car'); // Add car sprite in front of all sprites



	game.camera.roundPx = false; // stops the sprite from jittering.
	game.camera.follow(player);

	//scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });


	////////////////////////////////////
	//// Set up UI buttons for		////
	//// mobile						////
	////							////
	////////////////////////////////////

	uiButtons = game.add.group();
	uiButtons.alpha = .4;

	buttonleft = game.add.button(80, 550, 'button-left', null, this, 1, 0, 1, 0);  // Frame numbers correspond to up , down and over states for the button
	buttonleft.scale.setTo(8,8);
    buttonleft.fixedToCamera = true;
    buttonleft.events.onInputOver.add(function(){leftTouch=true;});
    buttonleft.events.onInputOut.add(function(){leftTouch=false;});
    buttonleft.events.onInputDown.add(function(){leftTouch=true;});
    buttonleft.events.onInputUp.add(function(){leftTouch=false;});
    uiButtons.add(buttonleft);

    buttonright = game.add.button(300, 550, 'button-right', null, this, 1, 0, 1, 0);  
    buttonright.scale.setTo(8,8);
    buttonright.fixedToCamera = true;
    buttonright.events.onInputOver.add(function(){rightTouch=true;});
    buttonright.events.onInputOut.add(function(){rightTouch=false;});
    buttonright.events.onInputDown.add(function(){rightTouch=true;});
    buttonright.events.onInputUp.add(function(){rightTouch=false;});
    uiButtons.add(buttonright);

    buttonjump = game.add.button(1040, 550, 'button-A', null, this, 1, 0, 1, 0);
    buttonjump.scale.setTo(8,8); 
    buttonjump.fixedToCamera = true;
    buttonjump.events.onInputOver.add(function(){jumpTouch=true;});
    buttonjump.events.onInputOut.add(function(){jumpTouch=false;});
    buttonjump.events.onInputDown.add(function(){jumpTouch=true;});
    buttonjump.events.onInputUp.add(function(){jumpTouch=false;});
    uiButtons.add(buttonjump);
}

function update() {
	parallax1.x = game.camera.x*0.1;
	var hitPlatform = game.physics.arcade.collide(player, platforms); // This sets the player to collide against the collision platforms
	gp = game.input.gamepad.pad1;
	player.body.velocity.x = 0;
	if (hasGP) {

		if ( facingRight ) {

			player.scale.x = 8;

		} else {

			player.scale.x = -8;
		}

		if (gp.isDown(Phaser.Gamepad.BUTTON_14) || leftKey.isDown || (leftTouch)) {

			facingRight = false;
			
			player.body.velocity.x = -400;

			if (!isJumping) {
				player.animations.play('left');
			};

		} else if (gp.isDown(Phaser.Gamepad.BUTTON_15) || rightKey.isDown || (rightTouch)) {

			facingRight = true;
			
			player.body.velocity.x = 400;

			if (!isJumping) {
				player.animations.play('right');
			};

		} else {
			if (!isJumping) {
				// player.animations.stop();
				// player.frame = 4;

				player.animations.play('idle');
			};
		};

		if (gp.isDown(Phaser.Gamepad.BUTTON_0) || controlKey.isDown || (jumpTouch) && player.body.touching.down && hitPlatform) {
			isJumping = true;
			player.body.velocity.y = -550;
			player.animations.stop();
			player.frame = 10;
		} else if (player.body.touching.down && hitPlatform) {
			isJumping = false;
		};

	};
	
}


function render() {
	//game.debug.text(game.time.fps, 2, 14, "#00ff00");
	game.debug.body(player);
	//game.debug.geom(ground,'#0fffff');
	//game.debug.cameraInfo(game.camera, 16, 16);
}

