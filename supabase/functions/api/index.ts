import {
  Application,
  Router,
  Context,
} from "https://deno.land/x/oak@v12.6.1/mod.ts";

const router = new Router();

router.get("/api/generate/profile-picture", async (context: Context) => {
  const openaiApiKey = Deno.env.get('OPEN_AI_KEY');
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      prompt: "A creative, professional profile picture",
      n: 1,
      size: "1024x1024",
    }),
  });

  const data = await response.json();

  return (context.response.body = data.data[0].url);
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 54321 });
