import { ShapeTypes } from "@/types/ShapTypes";
import { atom } from "recoil";

export const selectedShapAtom = atom<ShapeTypes>({
  default: "none",
  key: "selectedShapAtom",
});
