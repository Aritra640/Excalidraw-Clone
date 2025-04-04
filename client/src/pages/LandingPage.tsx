import { Footer } from "@/components/Footer";
import { GithubIcon } from "@/components/Icons/githubIcon";
import { FeatureCards } from "@/components/LandingPageComponents/bodycards";
import { MobileMenuModal } from "@/components/Modals/MenuModal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const redirectToGithub = () => {
    window.open(
      "https://github.com/Aritra640/Excalidraw-Clone",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const navigate = useNavigate();

  function Signin() {
    navigate("/signin");
  }

  function Signup() {
    navigate("/signup")
  }


  return (<div> <div className=""> 
    <div className="h-screen overflow-auto scrollbar-hidden">
      {/* HEADER */}
      <header className="bg-slate-950 fixed top-0 left-0 w-full backdrop-blur-md py-4 z-50">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          <div className="text-white">
            <span className="text-xl font-semibold">Excalidraw-Clone</span>
          </div>
          <div className="flex gap-6 items-center">
            <div onClick={redirectToGithub} className="hidden md:block text-white cursor-pointer">
              <GithubIcon />
            </div>
            <Button onClick={Signin} className="hidden md:block w-32 cursor-pointer hover:bg-slate-900">Sign in</Button>
            <Button onClick={Signup} className="hidden md:block w-32 bg-white text-black cursor-pointer hover:text-white">Get Started</Button>
            <div className="md:hidden flex items-center gap-4">
              <Button className="bg-white text-black hover:text-white cursor-pointer">Get Started</Button>
              <div className="cursor-pointer">
                <div className="text-white w-6 h-9" ><MobileMenuModal/></div> {/* Ensure visibility */}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="bg-slate-950 text-white min-h-screen pt-24 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl mt-10">Excalidraw-Clone</h1>
        <div className="mt-12"> {/* Added spacing between heading and feature cards */}
          <FeatureCards />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
    </div>
    </div>
  );
}

