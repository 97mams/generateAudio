import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="w-full h-18 flex items-center justify-between px-8 border-b border-b-2-accent">
      <img src="" alt="logo" />
      <div>
        <Button>
          <img src="./assets/github.svg" alt="logo_github" />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
