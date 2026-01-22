import type { dataType } from "@/App";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  onCreated: (data: dataType) => void;
  isPending: (state: boolean) => void;
};

export function SectionForm({ onCreated, isPending }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [borderColor, setBorderColor] = useState("");

  async function submit(formData: FormData) {
    const text = formData.get("text");
    const language = formData.get("language");

    if (typeof text !== "string" || text.trim() === "") {
      setBorderColor("border-red-500");
      toast.error("Please fill in the text field.");
      return;
    }

    try {
      setIsLoading(true);
      isPending(true);

      const response = await fetch(`${API_URL}/audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to create audio.");
        return;
      }

      const data: dataType = await response.json();
      onCreated(data);
      toast.success("Audio created successfully!");
      setBorderColor("");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
      isPending(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submit(formData);
    e.currentTarget.reset();
  }

  return (
    <div className="w-md">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex justify-center items-center md:items-start flex-row gap-2">
          <Textarea
            name="text"
            placeholder="your text ..."
            className={`${borderColor} w-85 md:h-80`}
            onChange={() => setBorderColor("")}
          />

          <div className="flex flex-col gap-2">
            <select
              name="language"
              className="border w-11 border-accent rounded"
              defaultValue="en"
            >
              <option value="en">En</option>
              <option value="fr">Fr</option>
            </select>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader className="animate-spin" /> : "Send"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
