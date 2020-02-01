var mcb = document.getElementById("mc");
var mc = mcb.getContext("2d");

var mcbheight = 400;
var mcbwidth = 400;
var h;
var v;
var multiplier = 20;
var p = Math.floor(mcb.width/multiplier);
var q = Math.floor(mcb.height/multiplier);
console.log(p,q);

function plot(x,y){
  mc.fillRect(multiplier*x,multiplier*y,multiplier,multiplier);
}


function cn(x,y){
  t=0;
  for(i=-1;i<=1;i++){
    t+=grid[x+i][y-1];
    t+=grid[x+i][y+1];
  }
  t+=grid[x-1][y]+grid[x+1][y];
  return t;
}

var cellsize = 20;
const gpu = new GPU();
var calc = gpu.createKernel(function(mcbwidth,mcbheight,cellsize){
	this.color(1,0,1);
}).setOutput([width,mcbheight]).setGraphical(true);

function render(){
	calc(mcbwidth,mcbheight,cellsize);
	document.getElementById('mainframe').appendChild(calc.canvas);
}




/*
function calcall(){
  mc.clearRect(0, 0, mcb.width, mcb.height);
  h=1;
  while(h<q-1){
    v=1
    while(v<p-1){
      if(grid[h][v]==1){
        plot(h,v);
      }
      count=cn(h,v);
      if(count==3 || (grid[h][v]==1 && count==2)){
        hot[h][v]=1;
      }else{
        hot[h][v]=0;
      }
      v++;
    }
    h++;
  }
  grid = JSON.parse(JSON.stringify(hot));
}*/

render();
setInterval(function(){calcall();},500);
