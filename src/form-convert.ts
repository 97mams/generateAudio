export const formDataToObject = (convertBtn: HTMLButtonElement): void => {
  convertBtn.addEventListener("click", (e) => {
    alert("mety");
    // const textArea = document.getElementById(
    //   "input-text"
    // ) as HTMLTextAreaElement;
    // const select = document.querySelector(
    //   "select[name='language']"
    // ) as HTMLSelectElement;

    // const text = textArea.value;
    // const langauge = select.value;
    // e.preventDefault();
    // voices(text, langauge);
  });
};

export const voices = (text: string, language: string): void => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  console.log(speechSynthesis.speak(utterance));
};
