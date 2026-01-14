import { DownloadIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import type { dataType } from "@/App";

export function ListItems(props: {
  items: dataType[];
  onDelete?: (id: string) => void;
}) {
  const handlerDelete = (id: string) => {
    fetch("http://localhost:3333/api/audio/" + id, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        props.onDelete?.(id);
        toast.success("Audio deleted successfull");
      });
  };

  const rendering = props.items?.map((item) => (
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

  return <div>{props.items?.length === 0 ? "" : rendering}</div>;
}
