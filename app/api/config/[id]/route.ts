import { createStaticClient } from "../../../../lib/supabase/static";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("configs")
    .select("script")
    .eq("config_id", id)
    .single();

  if (error || !data) {
    return new Response(
      `#!/data/data/com.termux/files/usr/bin/bash
echo "Error: Config not found. Visit forge.brgt.site/configurator to generate a new one."
exit 1`,
      {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      }
    );
  }

  return new Response(data.script, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
