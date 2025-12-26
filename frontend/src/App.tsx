import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { SectionForm } from "./components/sectionForm";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Hero />
      <SectionForm />
    </ThemeProvider>
  );
}

export default App;
