import { useEffect, useRef } from "react"
import { initDraw } from ".";
import { useShape } from "@/hooks/useShape";

export function Canvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapeContext = useShape();

  useEffect(()=>{

    if(canvasRef.current) {
      const canvas = canvasRef.current;

      initDraw(canvas , shapeContext.shape);
    }

  } , [canvasRef , shapeContext.shape]);

  return <div className="h-screen w-screen">
    <canvas className="bg-slate-950" ref={canvasRef} width={2000} height={2000}></canvas>
  </div>
}
