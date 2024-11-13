import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { html } from "hono/html";

import { template } from "./template.html.js";

const app = new Hono();

app.get("/", (c) => {
  return c.html(template());
});

app.post("/add", async (c) => {
  const body = await c.req.formData();
  const feedback = body.get("feedback");
  // TODO: Get analysis from AI

  return c.html(
    html`<article id="sentiment" class="pico-background-zinc-50">
      ${feedback}: analysis here...
    </article>`,
  );
});

serve({
  fetch: app.fetch,
  port: 4567,
});
