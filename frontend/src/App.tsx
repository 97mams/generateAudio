import { useEffect, useState } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { ListItems } from "./components/listItem";
import { SectionForm } from "./components/sectionForm";
import { ThemeProvider } from "./components/theme-provider";

export type dataType = {
  id: string;
  url: string;
  download: string;
  stream: string;
};

function App() {
  const [items, setItems] = useState<dataType[]>([]);

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
  }, [items.length]);

  const handlePostCreated = (data: dataType) => {
    setItems([...items, data]);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Hero />
      <div className="flex justify-around">
        <SectionForm onCreated={handlePostCreated} />
        <ListItems items={items} />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
