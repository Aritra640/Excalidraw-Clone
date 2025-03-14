import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Github, Twitter, Mail } from "lucide-react";

export function MobileMenuModal() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="w-6 h-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-slate-950 text-white">
        <div className="flex flex-col items-center space-y-6 mt-10">
          {/* Auth Buttons */}
          <Button className="w-full bg-slate-950 text-white hover:bg-slate-800">
            Sign In
          </Button>
          <Button className="w-full bg-slate-950 text-white hover:bg-slate-800">
            Get Started
          </Button>

          {/* Divider */}
          <div className="w-full border-t border-slate-800"></div>

          {/* Social Links */}
          <div className="flex flex-col space-y-4 w-full text-center">
            <a
              href="https://github.com/Aritra640"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-slate-950 hover:bg-slate-800 py-2 rounded-md"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>

            <a
              href="https://twitter.com/yourtwitter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-slate-950 hover:bg-slate-800 py-2 rounded-md"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </a>

            <a
              href="mailto:your@email.com"
              className="flex items-center justify-center gap-2 w-full bg-slate-950 hover:bg-slate-800 py-2 rounded-md"
            >
              <Mail className="w-5 h-5" />
              Contact
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

