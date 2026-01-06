import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { ListItems } from "./components/listItem";
import { SectionForm } from "./components/sectionForm";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Hero />
      <div className="flex justify-around">
        <SectionForm />
        <ListItems />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
