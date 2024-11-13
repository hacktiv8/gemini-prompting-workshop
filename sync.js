import * as browserSync from "browser-sync";
const sync = browserSync.create();

sync.init({
  proxy: "http://localhost:4567",
  files: ["./*.*"],
  port: 3000,
  open: false,
});
