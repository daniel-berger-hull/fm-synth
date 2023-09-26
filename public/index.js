

const GRAPH_WIDTH   = 650;
const GRAPH_HEIGHT  = 200;


const GRAPH_BORDER_MARGIN        = 10;


const GRAPH_Y_AXIS_OFFSET    = GRAPH_HEIGHT/2 + GRAPH_BORDER_MARGIN;


const GRAPH_X_AXIS_START_POS     = GRAPH_BORDER_MARGIN; 
const GRAPH_X_AXIS_END_POS       = GRAPH_WIDTH  - GRAPH_BORDER_MARGIN;
const GRAPH_X_AXIS_WIDTH         = GRAPH_X_AXIS_END_POS - GRAPH_X_AXIS_START_POS; 

const GRAPH_Y_AXIS_START_POS     = GRAPH_BORDER_MARGIN; 
const GRAPH_Y_AXIS_END_POS       = GRAPH_HEIGHT  - GRAPH_BORDER_MARGIN;



const SAMPLING_FREQUENCY        = 200;    // Number of sampling by seconds...
const SAMPLING_DURACTION_SECS   =  1;
let CARRIER_FREQUENCY           =  10;   // In Herts...

const dt = (2.0 * Math.PI) / SAMPLING_FREQUENCY;

const TOTAL_SAMPLING = SAMPLING_FREQUENCY * SAMPLING_DURACTION_SECS;




function initSliderEventHandler() {

  const slider = document.getElementById("myRange");
  const output = document.getElementById("slider-value");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
      output.innerHTML = this.value;
  }
}

function initDrawButtonEventHandler() {

  const drawButton = document.getElementById("draw-signal");
  

  drawButton.addEventListener("click", function() {
    const output = document.getElementById("slider-value");
    CARRIER_FREQUENCY           =  output.innerHTML;   // In Herts...

    console.log('Clicked! value is ' + CARRIER_FREQUENCY );

    draw();

  });


}

function initEventHandlers() {
   console.log('initEventHandlers');

   initDrawButtonEventHandler();
   initSliderEventHandler();

}


// Generate samples at the desired carrier frequency and scaled by the wanted amplitude.
function generateSignal(amplitude, carrierFrequency, totalSamples) {

  const signalArray = [];
  let t = 0.0;

  for (let i = 0; i < totalSamples; i++) {

      //Orginal, pure wave with no modulation...
      //const newPoint =  amplitude * Math.sin(carrierFrequency * t);

      const baseAngle = carrierFrequency * t;
      const modulationShift = Math.sin(5*t);
      const modulatedAngle = baseAngle + modulationShift;

      const newPoint =  amplitude * Math.sin( (carrierFrequency * t) + modulationShift);
      console.log(i + " -->  B: " + baseAngle + " S: " + modulationShift + " M: " + modulatedAngle);
      
      signalArray.push(newPoint);  // Adds a new element (Lemon) to fruits      
      t = t + dt;
  }

  return signalArray;

}

function draw() {
  console.log('Will draw...');


  const Amplitude = 50.0;

  const dataPoints = generateSignal(Amplitude,CARRIER_FREQUENCY,TOTAL_SAMPLING);
 
  drawGraph("canvas",dataPoints);

}

function drawGraph(canvasName,dataPoints) {
  
    var canvas = document.getElementById(canvasName);
    var ctx = canvas.getContext("2d");
        
      eraseCanvas(ctx);
      drawAxis(ctx);

    
      console.log("There are  " + dataPoints.length + " points to display...");

      const arrayEnd = dataPoints.length;
      let startPoint = {x:GRAPH_X_AXIS_START_POS, y:dataPoints[0]};

      
      const GRAPH_X_AXIS_END_POS       = GRAPH_WIDTH  - GRAPH_BORDER_MARGIN;
      const GRAPH_Y_AXIS_START_POS     = GRAPH_BORDER_MARGIN; 
      const GRAPH_Y_AXIS_END_POS       = GRAPH_HEIGHT  - GRAPH_BORDER_MARGIN;

      const dx = GRAPH_X_AXIS_WIDTH / dataPoints.length;





        for (let i = 1; i < arrayEnd; i++) {


            let endPoint = {x:startPoint.x+dx, y:dataPoints[i]};
          //console.log("Start Point is " + startPoint.x + " , " + startPoint.y + " to " +  endPoint.x + " , " + endPoint.y);
          drawSegment(ctx, startPoint, endPoint);


            startPoint = endPoint;
          } 


    console.log("Done");
 
}


function eraseCanvas(ctx){
	  ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, GRAPH_WIDTH, GRAPH_HEIGHT); 
}

function drawAxis(ctx){

   /* Draw X Axis at the bottom of the graph */
   ctx.beginPath();
//   ctx.moveTo(GRAPH_X_AXIS_START_POS, GRAPH_Y_AXIS_END_POS);
//   ctx.lineTo(GRAPH_X_AXIS_END_POS, GRAPH_Y_AXIS_END_POS);
   ctx.moveTo(GRAPH_X_AXIS_START_POS, GRAPH_Y_AXIS_OFFSET);
   ctx.lineTo(GRAPH_X_AXIS_END_POS, GRAPH_Y_AXIS_OFFSET);






   ctx.strokeStyle = '#00ff00';
   ctx.stroke();

 /* Draw Y Axis on the left of the edge of the graph */
   ctx.beginPath();
    ctx.moveTo(GRAPH_X_AXIS_START_POS, GRAPH_Y_AXIS_START_POS);
   ctx.lineTo(GRAPH_X_AXIS_START_POS, GRAPH_Y_AXIS_END_POS);
   ctx.strokeStyle = '#00ff00';
   ctx.stroke();
}

function  drawSegment(ctx, fromPos, toPos){

  ctx.beginPath();
   ctx.moveTo(fromPos.x, GRAPH_Y_AXIS_OFFSET - fromPos.y );
   ctx.lineTo(toPos.x, GRAPH_Y_AXIS_OFFSET - toPos.y );
   ctx.strokeStyle = '#ff0000';
   ctx.stroke();
}


window.addEventListener('load', function () {

    console.log('Page Loaded!!');


    initEventHandlers();

});
  

