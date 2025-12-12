import "./style.css";
import { setupCounter } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <h1>Text to Audio</h1>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
