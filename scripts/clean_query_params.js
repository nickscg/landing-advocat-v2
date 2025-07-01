
const fs = require("fs");
const path = require("path");

const indexPath = path.resolve(__dirname, "../index.html");
let html = fs.readFileSync(indexPath, "utf-8");

// Удаляем параметры ?scale-down-to=... из ссылок на ассеты
html = html.replace(/(\.\/?assets\/[^"']+?)\?[^"']+/g, "$1");

fs.writeFileSync(indexPath, html, "utf-8");
console.log("✅ clean_query_params.js: удалены параметры ?scale-down из ссылок");
