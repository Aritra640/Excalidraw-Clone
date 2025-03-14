import { atom } from "recoil";

export const MobileMenuAtom = atom<true|false>({
  default: false,
  key: "MobileMenuAtom",
});
