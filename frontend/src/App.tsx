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
  const [is, setIs] = useState<boolean>(false);

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

  const handleDelete = (id: string) => {
    const newItem = items.filter((item) => item.id != id);
    setItems(newItem);
  };

  const isPending = (state: boolean) => {
    setIs(state);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Hero />
      <div className="flex flex-col gap-2 md:flex-row items-center md:items-start md:justify-around">
        <SectionForm isPending={isPending} onCreated={handlePostCreated} />
        <ListItems isPending={is} items={items} onDelete={handleDelete} />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
