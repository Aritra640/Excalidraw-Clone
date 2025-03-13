
import {atom} from "recoil"

export const LandingPageMobileAtom = atom<true|false>({
  default: false,
  key: "LandingPageMobileAtom"
});
