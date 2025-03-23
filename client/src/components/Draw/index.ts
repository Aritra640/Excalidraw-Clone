import { ShapeTypes } from "@/types/ShapTypes";

export type shape =
  | {
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
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "arrow";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "text";
      x: number;
      y: number;
      text: string;
    } 
  | {
    
      type: "pencil";
      points: {
        x: number;
        y: number;
      }[];
    }
   |{

      type: "eraser";
    };

export function initDraw(canvas: HTMLCanvasElement, shapeType: ShapeTypes) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let existingShapes: shape[] = [];
  let clicked = false;
  let startX = 0,
    startY = 0;
  let width = 0,
    height = 0;
  let centerX = 0,
    centerY = 0,
    radius = 0;
  let endX = 0,
    endY = 0;
  let lineStartX = 0,
    lineStartY = 0;


  let currentPencilPoints: { x: number; y: number }[] = [];


  function getMousePos(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  //Eraser: Click to delete a shape**
  if (shapeType === "eraser") {
    canvas.addEventListener("click", (e) => {
      const pos = getMousePos(e);
      for (let i = 0; i < existingShapes.length; i++) {
        if (isShapeClicked(existingShapes[i], pos)) {
          existingShapes.splice(i, 1); // Remove shape
          clearCanvas(existingShapes, canvas, ctx);
          return;
        }
      }
    });
    return; // Skip other shape logic
  }

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    const pos = getMousePos(e);
    startX = pos.x;
    startY = pos.y;

    if (shapeType == "line" || shapeType == "arrow") {
      lineStartX = startX;
      lineStartY = startY;
    }else if (shapeType == "pencil") {
      currentPencilPoints = [{ x: startX, y: startY }];
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const pos = getMousePos(e);

    if (shapeType == "rect") {
      existingShapes.push({
        type: "rect",
        x: startX,
        y: startY,
        height: height,
        width: width,
      });
    } else if (shapeType == "circle") {
      existingShapes.push({
        type: "circle",
        centerX: centerX,
        centerY: centerY,
        radius: radius,
      });
    } else if (shapeType == "line") {
      existingShapes.push({
        type: "line",
        startX: lineStartX,
        startY: lineStartY,
        endX: pos.x,
        endY: pos.y,
      });
    } else if (shapeType == "arrow") {
      existingShapes.push({
        type: "arrow",
        startX: lineStartX,
        startY: lineStartY,
        endX: pos.x,
        endY: pos.y,
      });
    } else if (shapeType == "text") {
      const textInput = prompt("Enter text:");
      if (textInput) {
        existingShapes.push({
          type: "text",
          x: pos.x,
          y: pos.y,
          text: textInput,
        });
        clearCanvas(existingShapes, canvas, ctx);
      }
    } else if(shapeType == "pencil") {
      existingShapes.push({ type: "pencil", points: [...currentPencilPoints] });
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) return;
    const pos = getMousePos(e);

    if (shapeType == "rect") {
      width = pos.x - startX;
      height = pos.y - startY;
    } else if (shapeType == "circle") {
      radius = Math.sqrt((pos.x - startX) ** 2 + (pos.y - startY) ** 2);
      centerX = startX;
      centerY = startY;
    } else if (shapeType == "line" || shapeType == "arrow") {
      endX = pos.x;
      endY = pos.y;
    } else if (shapeType == "pencil") {
      currentPencilPoints.push({ x: pos.x, y: pos.y });
    }

    clearCanvas(existingShapes, canvas, ctx);
    ctx.strokeStyle = "rgba(255,255,255)";

    if (shapeType == "rect") {
      ctx.strokeRect(startX, startY, width, height);
    } else if (shapeType == "circle") {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shapeType == "line") {
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    } else if (shapeType == "arrow") {
      drawArrow(ctx, lineStartX, lineStartY, endX, endY);
    } else if(shapeType == "pencil") {
      ctx.beginPath();
      ctx.moveTo(currentPencilPoints[0].x, currentPencilPoints[0].y);
      currentPencilPoints.forEach(point => ctx.lineTo(point.x, point.y));
      ctx.stroke();
    }
  });
}

function clearCanvas(
  existingShapes: shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  existingShapes.forEach((shape) => {
    ctx.strokeStyle = "rgba(255,255,255)";

    if (shape.type == "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type == "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type == "line") {
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.stroke();
    } else if (shape.type == "arrow") {
      drawArrow(ctx, shape.startX, shape.startY, shape.endX, shape.endY);
    } else if (shape.type == "text") {
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText(shape.text, shape.x, shape.y);
    } else if(shape.type == "pencil") {
      ctx.beginPath();
    ctx.moveTo(shape.points[0].x, shape.points[0].y);
    shape.points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.stroke();
    }
  });
}

//Function to Draw an Arrow at the End of a Line
function drawArrow(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
) {
  const headLength = 10; // Length of arrowhead
  const angle = Math.atan2(toY - fromY, toX - fromX);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  // Draw arrowhead (two small lines at the end)
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6),
  );
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function isShapeClicked(shape: shape, pos: { x: number; y: number }): boolean {
  if (shape.type === "rect") {
    return pos.x >= shape.x && pos.x <= shape.x + shape.width &&
           pos.y >= shape.y && pos.y <= shape.y + shape.height;
  } else if (shape.type === "circle") {
    return Math.sqrt((pos.x - shape.centerX) ** 2 + (pos.y - shape.centerY) ** 2) <= shape.radius;
  } else if (shape.type === "line") {
    return pointToLineDistance(pos, shape) < 5;
  }
  return false;
}

function pointToLineDistance(point: { x: number; y: number }, line: { startX: number; startY: number; endX: number; endY: number }): number {
  const { x, y } = point;
  const { startX, startY, endX, endY } = line;

  const A = x - startX;
  const B = y - startY;
  const C = endX - startX;
  const D = endY - startY;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;

  if (len_sq !== 0) {
    param = dot / len_sq;
  }

  let nearestX, nearestY;

  if (param < 0) {
    nearestX = startX;
    nearestY = startY;
  } else if (param > 1) {
    nearestX = endX;
    nearestY = endY;
  } else {
    nearestX = startX + param * C;
    nearestY = startY + param * D;
  }

  const dx = x - nearestX;
  const dy = y - nearestY;
  return Math.sqrt(dx * dx + dy * dy);
}
