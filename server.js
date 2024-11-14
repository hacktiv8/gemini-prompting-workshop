import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { html } from "hono/html";

import { template } from "./template.html.js";
import { analyze } from "./gemini.js";

const app = new Hono();

app.get("/", (c) => {
  return c.html(template());
});

app.post("/add", async (c) => {
  const body = await c.req.formData();
  const feedback = body.get("feedback");
  const { color, analysis } = await analyze(feedback);
  console.log({ color, analysis });

  return c.html(
    html`<article id="sentiment" class="pico-background-${color}-50">
      ${analysis}
    </article>`,
  );
});

serve({
  fetch: app.fetch,
  port: 4567,
});
