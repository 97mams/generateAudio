import { DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type propsType = {
  id: number;
  url: string;
  download: string;
  stream: string;
}[];

export function ListItems() {
  const [items, setItems] = useState<propsType>();
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3333/api/audio";
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

  const rendering = items?.map((item) => (
    <div key={item.id}>
      <div className="flex items-end gap-2 mb-2">
        <figure>
          <audio controls>
            <source src={"http://localhost:3333/api" + item.stream} />
          </audio>
        </figure>
        <a href={item.download}>
          {" "}
          <Button variant={"outline"}>
            <DownloadIcon />
          </Button>
        </a>
      </div>
    </div>
  ));

  return <div>{items?.length === 0 ? "" : rendering}</div>;
}
