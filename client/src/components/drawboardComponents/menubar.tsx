import { DCMenuAtom } from "@/store/atoms/DCMenuAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

//basically a modal that pops out
export function DCmenubar() {
  const status = useRecoilValue(DCMenuAtom);
  const setStatus = useSetRecoilState(DCMenuAtom);

  function CloseModal() {

    setStatus(false);
  }

  return ( status &&
    <div className="flex justify-start">
      <div className="bg-slate-700 h-screen w-1/2 md:w-1/4">
        <div className="text-white flex justify-center items-center pt-2">
          Project-Name
        </div>
      </div>

      <div className="w-full bg-slate-500" onClick={CloseModal}>
      </div>
    </div>
  );
}
