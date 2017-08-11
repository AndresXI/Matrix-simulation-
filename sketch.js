
var symbolSize = 26;
var streams = [];

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize
  }
  textSize(symbolSize);
}//end set up function

function draw() {
  background(0, 150);
  streams.forEach(function(stream){
    stream.render();
  });


}//end draw function

function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(5, 70));
  this.first = first;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = round(random(0,1));
    }
  }

  this.rain = function() {
    if (this.y >= height) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  }
} //end symbol function

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(5, 10);
  this.generateSymbols = function(x, y) {
    var first = round(random(0, 1,)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol){
      if (symbol.first) {
        fill(255, 255, 188);
      } else {
        fill(255, 255, 40);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
} //end function stream


//String.fromCharCode(
//  0x30A0 + round(random(0, 96))
//);
