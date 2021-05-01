var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed,addFood
var fedtime,lastFed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed The Dog");
  feed.position(900,95);
  feed.mousePressed(feedDog);  

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedtime=database.ref('FeedTime');
  fedtime.on("value",function (data){
    lastFed=data.val();
  })
  textSize(20)
  fill("white")
if(lastFed>=13){
  text("Lastfeed:"+lastFed%12+"pm",350,30)
}else if(lastFed === 0){
  text("Lastfeed:12 am ",350,30)
}else{
  text("Lastfeed:"+lastFed+"am",350,30)
}

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  var food_stock_val=foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
})
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
