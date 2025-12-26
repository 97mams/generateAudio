import { DownloadIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function SectionForm() {
  function audio(formData: FormData) {
    console.log(formData.get("text"));
  }
  return (
    <div className="w-full flex items-star justify-around m-8">
      <div className="w-md">
        <form action={audio}>
          <div className="w-full grid gap-2">
            <Textarea name="text" rows={20} />
            <Button type="submit" variant={"secondary"}>
              Send
            </Button>
          </div>
        </form>
      </div>
      <div>
        <div className="flex items-end gap-2">
          <figure>
            <figcaption>Listen:</figcaption>
            <audio controls src=""></audio>
          </figure>
          <Button variant={"outline"}>
            <DownloadIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
