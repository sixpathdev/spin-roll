//hello world phasor-basic game=single scene in spin and win game
//1st step is to create game object in which we require game configuration
 let prizes_config={
     count : 8,
     prizes_names:["10 Rs","0 Rs","80 Rs","SPIN AGAIN","250 Rs","0 Rs","50 Rs","SPIN AGAIN"]
 }

 let config={
    type : Phaser.CANVAS,// //how to render the game -we use Phasor.CANVAS value..so that it used the canvas api to render game on web browser
    width:800,
    height:600,
    scene : {
        preload: preload,
        create: create,
        update: update,
    }
};

let game =new Phaser.Game(config);

function preload(){
    console.log("preload");
    //we will load some images
    this.load.image('background','../Assets/back.jpg');
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
}
function create(){
    //create the background image
    console.log("create");
    let W=game.config.width;
    let H=game.config.height;
    let background=this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.70);
   //lets create the stand
    let stand=this.add.sprite(W/2,H/2+170,'stand');
    stand.setScale(0.25);
    //let create a wheel
   this.wheel= this.add.sprite(W/2,H/2,'wheel');
   this.wheel.setScale(0.55);
//  this.wheel.angle+=0;
    this.wheel.alpha=0.95;
   
    //let create a pin
    let pin=this.add.sprite(W/2-15,H/2-170,'pin');
    pin.setScale(0.05);
    //created event listener for mouse click
     this.input.on("pointerdown",spinwheel,this);
    
    //let create text object
    font_style={
        font: "bold 30px Arial",
        align:"center",
        color:"red",
    }
    this.game_text=this.add.text(10,10,"Welcome to Spin & Win",font_style);
    
    
}
//game loop 
function update(){
    console.log("inside update");
  //this.wheel.angle+=1;
   //his.wheel.scaleX +=0.0000001;//wheel size increses slowly slowly
//  this.wheel.scaleY +=0.0000001;
    
    
}
function spinwheel(){
        console.log("you clicked tyhe mouse");
        console.log("strat spinning");
       // this.game_text.setText("YOU CLICKED THE MOUSE"); 
    let rounds = Phaser.Math.Between(2,4);
    console.log(rounds);
    let degrees=Phaser.Math.Between(0,8)*40;
    let total_angle = rounds * 360 + degrees;
    console.log(total_angle);
    let idx = prizes_config.count-1-Math.floor(degrees/(360/prizes_config.count)); 
    
    
    tween = this.tweens.add({
        targets:this.wheel,
        angle:total_angle,
        ease:"Cubic.easeOut",
       //caleX : 0.7,
    //  scaleY  :0.7,
        duration:6000,
        callbackScope:this,
        onComplete:function(){
    this.game_text.setText("You won "+ prizes_config.prizes_names[idx]);
        }
    })
    }


 