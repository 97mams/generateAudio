import type { dataType } from "@/App";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function SectionForm({
  onCreated,
}: {
  onCreated: (data: dataType) => void;
}) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>("");

  async function audio(formData: FormData) {
    if (formData.get("text") == "") {
      setBorderColor("border-red-500");
      toast.error("Please fill in the text field.");
      return;
    }
    try {
      const respose = await fetch("http://localhost:3333/api/audio", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: formData.get("text"),
          language: formData.get("language"),
        }),
      });

      if (respose.ok) {
        onCreated(await respose.json());
        toast.success("Audio created successfully!");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    } finally {
      setBorderColor("");
      setIsPending(true);
      setTimeout(() => {
        setIsPending(false);
      }, 1000);
    }
  }

  console.log("isPending:", isPending);

  return (
    <div className="w-md">
      <form action={audio}>
        <div className="w-full flex gap-2">
          <Textarea
            name="text"
            className={borderColor}
            rows={20}
            placeholder="your text ..."
          />
          <div className="flex flex-col gap-2">
            <select
              className="border w-11 border-accent rounded"
              name="language"
            >
              <option value="en">En</option>
              <option value="fr">Fr</option>
            </select>
            <Button type="submit" className={borderColor}>
              {isPending ? <Loader className="animate-spin" /> : "send"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
