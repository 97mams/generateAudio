import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function SectionForm() {
  // const [isPending, setIsPending] = useState<boolean>(false);

  async function audio(formData: FormData) {
    await fetch("http://localhost:3333/api/audio", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: formData.get("text"),
        language: formData.get("language"),
      }),
    });
    //
    // const status = await r.status;
    // if (status) {
    //   setIsPending(true);
    // }
  }

  return (
    <div className="w-md">
      <form action={audio}>
        <div className="w-full flex gap-2">
          <Textarea name="text" rows={20} placeholder="your text ..." />
          <div className="flex flex-col gap-2">
            <select
              className="border w-11 border-accent rounded"
              name="language"
            >
              <option value="en">En</option>
              <option value="fr">Fr</option>
            </select>
            <Button type="submit" variant={"secondary"}>
              {/* {isPending ? "Sending..." : "send"} */}send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
