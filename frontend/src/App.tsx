import { useEffect, useState } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { ListItems } from "./components/listItem";
import { SectionForm } from "./components/sectionForm";
import { ThemeProvider } from "./components/theme-provider";

type propsType = {
  id: string;
  url: string;
  download: string;
  stream: string;
}[];

function App() {
  const [items, setItems] = useState([]);

  const url = "http://localhost:3333/api/audio";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Hero />
      <div className="flex justify-around">
        <SectionForm
          onCreated={(item) => setItems((prev: propsType) => [item, ...prev])}
        />
        <ListItems items={items} />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
