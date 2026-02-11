import type { dataType } from "@/App";
import { DownloadIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const API_URL = import.meta.env.VITE_API_URL;

export function ListItems({
  items,
  onDelete,
  isPending,
}: {
  items: dataType[];
  isPending?: boolean;
  onDelete?: (id: string) => void;
}) {
  console.log("url", API_URL);
  const handlerDelete = async (id: string) => {
    try {
      const resp = await fetch(`${API_URL}/audio/${id}`, {
        method: "DELETE",
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Failed to delete audio");
      if (data.type === "error") {
        toast.error(data.message);
        return;
      }

      onDelete?.(id);
      toast.success(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const sekeletonRender = () => {
    return (
      <div className="w-md h-96 overflow-y-auto">
        {[1].map((item) => (
          <div key={item} className="flex items-end gap-2 mb-2">
            <Skeleton className="w-64 h-10" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-md h-96 overflow-y-auto">
      {items.length === 0 && sekeletonRender()}
      {items.map((item) => (
        <div key={item.id} className="flex items-end gap-2 mb-2">
          <audio controls>
            <source src={`${API_URL}${item.stream}`} />
          </audio>

          <a href={`${API_URL}${item.download}`}>
            <Button variant="outline">
              <DownloadIcon />
            </Button>
          </a>

          <Button variant="destructive" onClick={() => handlerDelete(item.id)}>
            <Trash2 />
          </Button>
        </div>
      ))}
      {isPending && sekeletonRender()}
    </div>
  );
}
