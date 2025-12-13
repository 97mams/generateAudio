import { setupCounter } from "./counter.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <nav class="flex justify-between items-center p-4 bg-gray-800 text-white">
    <img src="./src/asset/images/logo.svg" alt="Logo" class="w-10 h-10 rounded">
    <button class="bg-muted hover:border-forground text-white font-bold py-2 px-4 rounded">
      <img src="./src/asset/images/github.svg" alt="GitHub" class="w-10 h-10 rounded">
    </button>
  </nav>
    <h1 class="text-4xl font-bold mt-4">Text to Audio</h1>
    <p class="text-lg">Convert text to audio with ease.</p>
    <div class="flex flex-col justify-center items-center">
      <textarea class="border border-gray-300 rounded px-4 py-2 mr-4">Entrer vos text</textarea>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Convert</button>
    </div>
  <footer class="fixed bottom-0 w-full flex justify-center items-center p-4 bg-gray-800 text-white">
    <p class="text-lg">Copyright © 2025 Text to Audio</p>
  </footer>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
