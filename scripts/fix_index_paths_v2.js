
const fs = require("fs");
const path = require("path");

const indexPath = path.resolve(__dirname, "../index.html");
let html = fs.readFileSync(indexPath, "utf-8");

// Заменяем framerusercontent изображения на ./assets/
html = html.replace(/https:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9._%-]+)/g, "./assets/$1");

// Заменяем .mjs, svg, fonts
html = html.replace(/https:\/\/framerusercontent\.com\/assets\/([a-zA-Z0-9._%-]+)/g, "./assets/$1");
html = html.replace(/https:\/\/framerusercontent\.com\/sites\/[^"]+\/([a-zA-Z0-9._%-]+\.mjs)/g, "./assets/$1");

// Удаляем внешние скрипты и стили
html = html.replace(/<script[^>]+src=["']https?:\/\/[^>]+framer\.com[^>]*><\/script>/g, "");
html = html.replace(/<script[^>]+src=["']https?:\/\/[^>]+googletagmanager\.com[^>]*><\/script>/g, "");
html = html.replace(/<link[^>]+href=["']https?:\/\/fonts\.googleapis\.com[^>]*>/g, "");
html = html.replace(/<link[^>]+href=["']https?:\/\/fonts\.gstatic\.com[^>]*>/g, "");
html = html.replace(/<script[^>]+src=["']https?:\/\/events\.framer\.com[^>]*><\/script>/g, "");
html = html.replace(/<link[^>]+href=["']https?:\/\/framerusercontent\.com\/third-party-assets\/[^>]+>/g, "");

// Сохраняем
fs.writeFileSync(indexPath, html, "utf-8");
console.log("✅ fix_index_paths_v2.js: внешние ссылки удалены и заменены");
