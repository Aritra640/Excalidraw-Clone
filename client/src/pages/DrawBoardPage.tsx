import { arrow } from "@/components/drawboardsvg/arrow";
import { circle } from "@/components/drawboardsvg/circle";
import { eraser } from "@/components/drawboardsvg/eraser";
import { line } from "@/components/drawboardsvg/line";
import { Pencil } from "@/components/drawboardsvg/pencil";
import { rectangle } from "@/components/drawboardsvg/rectangle";
import { FileLines } from "@/components/heroicons/file_lines";
import { useState } from "react";

export function DrawingBoardPage() {
  return (
    <div className="bg-slate-950 h-screen w-screen">
      <div className="flex items-start px-4 pt-3">
        <Menu />

        <div className="flex-1 flex justify-center">
          <DrawOptionBar />
        </div>
      </div>
    </div>
  );
}

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  function onModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <div className="text-white cursor-pointer pt-2 hover:text-gray-400" onClick={onModal}>
        <FileLines />
      </div>
      {isOpen && <MenuModal closeModal={() => setIsOpen(false)} />}
    </div>
  );
}

function MenuModal({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="absolute top-16 left-0 bg-gray-800 text-white rounded-md shadow-lg w-48 p-2">
      <div className="p-2 border-b border-gray-600">Project Name</div>
      <div className="p-2 cursor-pointer hover:bg-gray-700" onClick={closeModal}>Save & Exit</div>
      <div className="p-2 cursor-pointer hover:bg-gray-700" onClick={closeModal}>Dashboard</div>
      <div className="p-2 cursor-pointer hover:bg-gray-700" onClick={closeModal}>Collaborate</div>
      <div className="p-2 cursor-pointer hover:bg-gray-700 text-red-500" onClick={closeModal}>Close</div>
    </div>
  );
}

function DrawOptionBar() {
  return (
    <div className="bg-gray-500 rounded-md flex justify-start">
      <ShareComponent />
      <ButtonComponent>
        <div>Save</div>
      </ButtonComponent>
      <ButtonComponent>{rectangle()}</ButtonComponent>
      <ButtonComponent>{circle()}</ButtonComponent>
      <ButtonComponent>{line()}</ButtonComponent>
      <ButtonComponent>{arrow()}</ButtonComponent>
      <ButtonComponent>
        <div>Text</div>
      </ButtonComponent>
      <ButtonComponent>{eraser()}</ButtonComponent>
      <ButtonComponent>{Pencil()}</ButtonComponent>
    </div>
  );
}

interface ButtonComponentProp {
  children: React.ReactNode;
}

function ButtonComponent({ children }: ButtonComponentProp) {
  return (
    <div className="text-white cursor-pointer p-2 hover:bg-black">
      {children}
    </div>
  );
}

function ShareComponent() {
  return (
    <div
      className="text-white rounded-l-md cursor-pointer bg-indigo-900 hover:bg-indigo-950
    flex justify-center items-center"
    >
      <div className="p-1">Share</div>
    </div>
  );
}

