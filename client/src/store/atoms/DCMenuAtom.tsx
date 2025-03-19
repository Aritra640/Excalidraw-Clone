import { atom } from "recoil";

export const DCMenuAtom = atom<true|false>({
  default: true,
  key: "DCMenuAtom",
});
