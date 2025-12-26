import { GithubIcon } from "./GithubIcon";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="w-full h-18 flex items-center justify-between px-8 border-b border-b-2-accent">
      <div className="flex">
        <img src="/audio.svg" alt="logo" className="w-10 h-8" />
        <h1 className="font-Bold size-6">Mptreo</h1>
      </div>
      <div className="flex gap-1">
        <Button>
          <GithubIcon />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
