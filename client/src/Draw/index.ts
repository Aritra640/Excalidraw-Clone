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
    };

export function initDraw(canvas: HTMLCanvasElement) {
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

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    console.log(e.clientX);
    console.log(e.clientY);

    existingShapes.push({
      type: "rect",
      x: startX,
      y: startY,
      height: height,
      width: width,
    });
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked == true) {
      width = e.clientX - startX;
      height = e.clientY - startY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

function clearCanvas(
  existingShapes: shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0)";
}
