import { Header } from "./components/header";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <h1>Hello</h1>
    </ThemeProvider>
  );
}

export default App;
