import type { dataType } from "@/App";
import { DownloadIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const API_URL = import.meta.env.API_URL;

export function ListItems({
  items,
  onDelete,
}: {
  items: dataType[];
  onDelete?: (id: string) => void;
}) {
  const handlerDelete = async (id: string) => {
    try {
      const resp = await fetch(`${API_URL}/audio/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error();

      onDelete?.(id);
      toast.success("Audio deleted successfully");
    } catch {
      toast.error("Failed to delete audio");
    }
  };

  return (
    <div className="w-md h-96 overflow-y-auto">
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">No audio available</p>
      )}

      {items.map((item) => (
        <div key={item.id} className="flex items-end gap-2 mb-2">
          <audio controls preload="none">
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
    </div>
  );
}
