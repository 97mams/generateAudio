import { setupCounter } from "./counter.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <nav class="flex justify-between items-center p-4 text-white">
    <img src="./src/asset/images/logo.svg" alt="Logo" class="w-10 h-10 rounded">
    <button class="border border-card hover:border-card-foreground text-white font-bold py-2 px-4 rounded">
      <img src="./src/asset/images/github.svg" alt="GitHub" class="w-10 h-10 rounded">
    </button>
  </nav>
    <div class="text-center my-8">
      <h1 class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Text to Audio</h1>
      <p class="leading-7 [&:not(:first-child)]:mt-6">Convert text to audio with ease.</p>
    </div>
    <div class="flex justify-around">
    <div class="flex justify-between items-start">
      <textarea class="h-100 w-md border border-gray-300 rounded px-4 py-2 mr-4" placeholder="Enter your text"></textarea>
      <button class="bg-primary hover:bg-primary-foreground text-white font-bold py-2 px-4 rounded">Convert</button>
    </div>
    <div class="w-full max-w-md flex flex-row h-20 items-center gap-2">
      <audio controls>
        <source src="audio-file.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio> 
      <button class=" bg-secondary hover:bg-secondary-foreground text-white font-bold h-10 w-10 flex items-center justify-center rounded"><img src="./src/asset/images/download.png" class="covertt" /></button>
    </div>
  <footer class="fixed bottom-0 w-full flex justify-center items-center p-4 bg-gray-800 text-white">
    <p class="text-lg">Copyright © 2025 Text to Audio</p>
  </footer>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
