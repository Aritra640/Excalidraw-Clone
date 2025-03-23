import { ShapeTypes } from "@/types/ShapTypes";

export type shape =
   {
      type: "rect";
      x: number;
      y: number;
      height: number;
      width: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  |{
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
  };

export function initDraw(canvas: HTMLCanvasElement , shapeType: ShapeTypes) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  let existingShapes: shape[] = [];

  let clicked = false;
  let startX = 0;
  let startY = 0;
  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;
  let radius = 0;
  let endX = 0;
  let endY = 0;
  let lineStartX = 0;
  let LineStartY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;

    if(shapeType == "line") {
      lineStartX = startX;
      LineStartY = startY;
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    console.log(e.clientX);
    console.log(e.clientY);
    
    if(shapeType == "rect") {
      existingShapes.push({
        type: "rect",
        x: startX,
        y: startY,
        height: height,
        width: width,
      });
    }
    else if(shapeType == "circle") {
      existingShapes.push({
        type: "circle",
        centerX: centerX,
        centerY: centerY,
        radius: radius,
      });
    }
    else if(shapeType == "line") {
      existingShapes.push({
        type: "line",
        startX: lineStartX,
        startY: LineStartY,
        endX: endX,
        endY: endY,
      })
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked == true) {
      if(shapeType == "rect") {
        width = e.clientX - startX;
        height = e.clientY - startY;
      }
      else if(shapeType == "circle") {
        radius = Math.sqrt(Math.pow(e.clientX - startX , 2) + Math.pow(e.clientY - startY , 2));
        centerX = startX;
        centerY = startY;
      }
      else if(shapeType == "line") {
        endX = e.clientX;
        endY = e.clientY;
      }

      clearCanvas(existingShapes , canvas , ctx);
      ctx.strokeStyle = "rgba(255,255,255)";
      if(shapeType == "rect") {
        ctx.strokeRect(startX, startY, width, height);
      }
      else if(shapeType == "circle") {
        ctx.beginPath();
        ctx.arc(centerX , centerY , radius , 0 , Math.PI * 2);
        ctx.stroke();
      }
      else if(shapeType == "line") {
        ctx.beginPath();
        ctx.moveTo(lineStartX , LineStartY);
        ctx.lineTo(endX , endY);
        ctx.stroke();
      }
    }
  });
}

function clearCanvas(existingShapes: shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D ) {

  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  existingShapes.map((shape)=>{
    if(shape.type == "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }else if(shape.type == "circle") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.beginPath();
      ctx.arc(shape.centerX , shape.centerY , shape.radius , 0 , Math.PI * 2);
      ctx.stroke();
    }else if(shape.type == "line") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.beginPath();
      ctx.moveTo(shape.startX , shape.startY);
      ctx.lineTo(shape.endX , shape.endY);
      ctx.stroke();
    }
  })
}
