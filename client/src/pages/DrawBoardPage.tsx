import { arrow } from "@/components/drawboardsvg/arrow";
import { circle } from "@/components/drawboardsvg/circle";
import { eraser } from "@/components/drawboardsvg/eraser";
import { line } from "@/components/drawboardsvg/line";
import { Pencil } from "@/components/drawboardsvg/pencil";
import { rectangle } from "@/components/drawboardsvg/rectangle";

export function DrawingBoardPage() {

  return <div className="bg-slate-950 h-screen w-screen">
    <div className="flex justify-center pt-2">
      <DrawOptionBar />
    </div>

  </div>
}





function DrawOptionBar() {

  return <div className="bg-gray-500 rounded-md flex justify-start">
    <ButtonComponent><div>Save</div></ButtonComponent>
    <ButtonComponent>{rectangle()}</ButtonComponent>
    <ButtonComponent>{circle()}</ButtonComponent>
    <ButtonComponent>{line()}</ButtonComponent>
    <ButtonComponent>{arrow()}</ButtonComponent>
    <ButtonComponent><div>Text</div></ButtonComponent>
    <ButtonComponent>{eraser()}</ButtonComponent>
    <ButtonComponent>{Pencil()}</ButtonComponent>
  </div>
}

interface ButtonComponentProp {
  children: React.ReactNode;
}

function ButtonComponent({children}:ButtonComponentProp) {
  return <div className="text-white cursor-pointer p-2 hover:bg-black">
    {children}
  </div>
}

function ShareComponent() {

  return <div>
  </div>
}
