var canvas = document.querySelector("canvas")
// the height of the entire canvas

canvas.width = window.innerWidth
canvas.height = window.innerHeight


var ctx = canvas.getContext("2d"); 
var rectangles = []

var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var mouseIsDown = false;
var lastX = 0;
var lastY = 0;

var current_shape_index = null

var x = 100;
var tmp_y = 100;



function Rectangle(x,y) {        
    // this.box_name = box_name
    this.x = x;
    this.y = y;
    this.width = 80
    this.height = 20
    this.color = "rgb(0,0,0)"
    this.right = this.x + this.width
    this.bottom = this.y + this.height      

}


//check if the xy of the box is in the specific location
var check_newbox_location = function(){    
    console.log(rectangles)
    for (var shape of rectangles){
        console.log(shape.x);
        if (tmp_y == shape.y){           
            tmp_y += 40;
            return tmp_y;
        }       
    }
    return tmp_y;
}


// add a box in a cavass function
// add the object to rectangles list
function push() {
        y = check_newbox_location();
        console.log(y);
        var rectangle = new Rectangle(x,y);
        rectangles.push(rectangle);
        // console.log(rectangles.length)
        draw();

}


let draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var shape of rectangles){
        ctx.fillStyle="rgba(220,220,220,0.5)";
        ctx.strokeStyle =shape.color;
        ctx.fillRect(shape.x,shape.y,shape.width ,shape.height);
        ctx.strokeRect(shape.x,shape.y,shape.width ,shape.height);      
        ctx.fillStyle="rgba(225,0,0,.9)";
        ctx.fillText("text here",shape.x+5,shape.y+10)
    }
}

//check if the xy of the mouse when click is inside the box
function check_mouse_in_shape(x,y,shape){
    var shape_left = shape.x;
    var shape_right = shape.x + shape.width;
    var shape_top = shape.y;
    var shape_bottom = shape.y + shape.height;
    if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
        return true;       
    }
    return false;
}

function handleMouseDown(e) {
    e.preventDefault();
    lastX = parseInt(e.clientX - offsetX);
    lastY = parseInt(e.clientY - offsetY); 
    var index = 0;
    for (let shape of rectangles){        
        if (check_mouse_in_shape(lastX,lastY,shape)) {
            console.log("inside");
            current_shape_index = index;
            mouseIsDown = true;
            console.log(current_shape_index);   
            var current_shape = rectangles[current_shape_index];  
            current_shape.color = "rgb(255,0,0)"
            return;   
        }
        else{
            current_shape_index = null;        
        }
        index++;        
    }
}

function handleMouseUp(e) {    
    e.preventDefault();
    if (!mouseIsDown) {
        return;
    }
    else{
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    // console.log("mouseup");
    mouseIsDown =false;
    var current_shape = rectangles[current_shape_index]; 
    current_shape.color ="rgb(0,0,0)";
    draw()
    }
}


function handleMouseMove(e) {
    e.preventDefault();
    if (!mouseIsDown) {
        return;
    }
    else{
        e.preventDefault()
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        var dx = mouseX - lastX;
        var dy = mouseY - lastY;

        var current_shape = rectangles[current_shape_index];
        current_shape.x += dx;
        current_shape.y += dy;
        draw()
        lastX = mouseX;
        lastY = mouseY;
    }

}




$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});

