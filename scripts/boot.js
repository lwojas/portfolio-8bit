/*var platforms;
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
var pickup;*/


////  The Google WebFont Loader will look for this object, so create it before loading the script.
//////////////////////////////////////////////////////////////////////////////////////////////////
/*WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    
    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
	    families: ['Revalia', 'VT323']
    }

};*/


var BasicGame = {}; // This is a namespace, you store everything inside of this instead of filling up the global space.

////////////////////////////////////
// Basic Game namespace variables:
////////////////////////////////////

BasicGame.gp; // Gamepad
BasicGame.GameIsPaused = false;
BasicGame.facingRight = true;
BasicGame.isJumping = false;

// Text
BasicGame.title;

// Arrays
BasicGame.door;
BasicGame.portalIndex = [];

// Controls
BasicGame.leftTouch = false;
BasicGame.rightTouch = false;
BasicGame.jumpTouch = false;
BasicGame.interactTouch = false;

BasicGame.leftKey;
BasicGame.rightKey;
BasicGame.downKey;
BasicGame.upKey;

BasicGame.controlKey;

// UI Sprites
BasicGame.uiButtonleft;
BasicGame.uiButtonright;
BasicGame.uiButtonjump;
BasicGame.fullScreenMessage;

// Sprite variables
BasicGame.background;
BasicGame.foreground;
BasicGame.platforms;
BasicGame.player; // Player sprite and logic
BasicGame.uiButtons; // UI input for mobile

BasicGame.Boot = function (game) {

};

// Note to self, replaced 'game' with 'this' 

BasicGame.Boot.prototype = {

	
	init: function(){
		console.log('Init has fired');
		
		this.game.stage.smoothed = false;
	},

	preload: function() {
		console.log('preload has fired');

		//game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		this.load.image('sky', 'assets/background.png');
		this.load.image('foreground', 'assets/foreground.png');
		this.load.image('hubBG', 'assets/hub-bg.png');
		this.load.image('ground', 'assets/collision.png');
	    this.load.image('platform', 'assets/platform2.png');
	    this.load.image('star', 'assets/door.png');
	    this.load.spritesheet('dude', 'assets/hero2.png', 16, 16);
	    this.load.image('car', 'assets/car.png');
	    this.load.image('sign', 'assets/zzz.png');
	    this.load.spritesheet('button-left', 'assets/touch_controls_left.png', 20, 17);
	    this.load.spritesheet('button-right', 'assets/touch_controls_right.png', 20, 17);
	    this.load.spritesheet('button-A', 'assets/touch_controls_A.png', 20, 17);
	    this.load.spritesheet('bigMessageBox', 'assets/uiMessagebox.png');
	    this.load.image('smallMessage', 'assets/interactSprite.png');
	    this.load.image('defaultCollisionBox', 'assets/defaultCollisionBox.png');

	    //console.log(this.cache);
	},

	create: function() {
		console.log('create has fired');

		////////////////////////////////////
		//// Set up game and inputs		////
		////							////
		////							////
		////////////////////////////////////

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Scale the canvas to fit the whole window

		this.world.setBounds(0, 0, 3840, 4000); // Set the size of the game world - this is not the size of the camera

		// Log keystrokes to variables
		BasicGame.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP); 
		BasicGame.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		BasicGame.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		BasicGame.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		BasicGame.controlKey = this.input.keyboard.addKey(Phaser.Keyboard.CONTROL); // jump action

		this.input.gamepad.start(); // Start the gamepad input
		
		this.time.advancedTiming = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);


		game.camera.roundPx = false; // stops the sprite from jittering.
		
	    game.state.start('Hub'); // Load the first level

		},

};


// This sets up the Phaser game state on the canvas and sets the camera resolution
var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', null, false, false); 


// Add game states and start the game
window.onload = function() {
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Hub', BasicGame.Hub);
	game.state.add('Level2', BasicGame.Level2);
	game.state.start('Boot');

	BasicGame.portalIndex = [

		'Hub',				// 0
		'Level2',			// 1

	];
};

