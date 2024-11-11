import { argv } from "node:process";

import { generate } from "./gemini.js";

if (argv.length < 3) {
  console.log('Usage: node --env-file=.env cli.js "ask some question"');
  process.exit(1);
}

const prompt = argv[argv.length - 1];
console.log(await generate(prompt));
