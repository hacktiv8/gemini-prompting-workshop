import { html } from "hono/html";

export function template() {
  return html`<html>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <title>Feedback+</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.colors.min.css"
    />
    <script src="https://unpkg.com/htmx.org@2.0.3"></script>
    <body>
      <main class="container">
        <h1>Feedback+<span id="eventSpan"></span></h1>
        <form
          id="checkForm"
          hx-post="/add"
          hx-target="#sentiment"
          hx-swap="outerHTML"
          hx-include="#feedback"
          hx-on::after-request="this.reset()"
        >
          <input type="hidden" value="" id="eventName" />
          <fieldset>
            <input
              name="feedback"
              id="feedback"
              placeholder="Satu atau beberapa kata yang menurut kamu mewakili sesi kali ini."
              required="required"
              type="text"
            />
          </fieldset>

          <button type="submit" id="submit">Kirim</button>
        </form>
        <article id="sentiment" class="pico-background-zinc-50">
          Sentiment for feedback.
        </article>
      </main>
    </body>
  </html>`;
}
