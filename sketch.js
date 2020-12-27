//Create variables here
var dog,happyDog,dogImg,happyDogImg;
var database;
var foodStock, food;


function preload(){
  dogImg = loadImage("images/dogImg1.png");
  happyDogImg = loadImage("images/dogImg.png");
}


function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(225,390,20,20);
  dog.addImage("dogImg1.png",dogImg);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    dog.addImage("dogImg.png",happyDogImg);
    writeStock(food);
  }


  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
  text("Food Remaining: "+ food, 150,200);

  fill("black");
  textSize(15);
  text("Press the up arrow to feed your dog!!",50,50);


}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    food:x
  })
}

function readStock(data){
  food = data.val();
  console.log(food);
}
