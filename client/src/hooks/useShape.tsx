import { ShapeContext } from "@/store/context";
import { useContext } from "react";

export const useShape = () => {
  const context = useContext(ShapeContext);
  if (!context) {
    throw new Error("useShape must be used within a ShapeProvider");
  }
  return context;
};

