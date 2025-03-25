import { ShapeTypes } from "@/types/ShapTypes";
import React, { createContext, useState } from "react";

export type ShapeContextType = {
  shape: ShapeTypes;
  setShape: (shape: ShapeTypes) => void
};


export const ShapeContext = createContext<ShapeContextType | undefined>(undefined);

interface ShapeProviderProp {
  children : React.ReactNode;
}

export function ShapeProvider({children}:ShapeProviderProp) {

  const [shape , setShape] = useState<ShapeTypes>("none");
    
  return (
    <ShapeContext.Provider value={{ shape, setShape }}>
      {children}
    </ShapeContext.Provider>
  );
};


