import { LandingPageMobileAtom } from "@/store/atoms/LandingPageMobileAtom"
import { useRecoilValue } from "recoil"

export function LandingPageMobileModal() {

  const ModalStatus = useRecoilValue(LandingPageMobileAtom);

  return (
    ModalStatus && (
      
      <div className="h-screen w-screen flex justify-end fixed ">
        
      </div>
    )
  )
}
