import { initDraw } from "@/Draw";
import { useEffect, useRef } from "react"

export function Canvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{

    if(canvasRef.current) {
      const canvas = canvasRef.current;
      
      initDraw(canvas);
    }

  } , [canvasRef])

  return <div className="h-screen w-screen">
    <canvas className="bg-slate-950" ref={canvasRef} width={2000} height={2000}></canvas>
  </div>
}
