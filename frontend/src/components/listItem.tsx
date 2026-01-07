import { DownloadIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type propsType = {
  id: string;
  url: string;
  download: string;
  stream: string;
}[];

export function ListItems() {
  const [items, setItems] = useState<propsType>();

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

  const handlerDelete = (id: string) => {
    const newItem = items?.filter((item) => item.id != id);
    setItems(newItem);
    fetch(url + "/" + id, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) toast("Audio deleted successfully");
      });
  };

  const rendering = items?.map((item) => (
    <div key={item.id}>
      <div className="flex items-end gap-2 mb-2">
        <figure>
          <audio controls>
            <source src={"http://localhost:3333/api" + item.stream} />
          </audio>
        </figure>
        <a href={"http://localhost:3333/api" + item.download}>
          {" "}
          <Button variant={"outline"}>
            <DownloadIcon />
          </Button>
        </a>
        <Button variant={"destructive"} onClick={() => handlerDelete(item.id)}>
          <Trash2 />
        </Button>
      </div>
    </div>
  ));

  return <div>{items?.length === 0 ? "" : rendering}</div>;
}
