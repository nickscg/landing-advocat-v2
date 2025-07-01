
const fs = require("fs");
const path = require("path");

const indexPath = path.resolve(__dirname, "../index.html");
let html = fs.readFileSync(indexPath, "utf-8");

// Заменяем framerusercontent изображения на ./assets/
html = html.replace(/https:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9._%-]+)/g, "./assets/$1");

// Заменяем framerusercontent assets (mjs, fonts, svg) на ./assets/
html = html.replace(/https:\/\/framerusercontent\.com\/assets\/([a-zA-Z0-9._%-]+)/g, "./assets/$1");

// Удаляем подключение к edit.framer.com
html = html.replace(/<script[^>]*src=["']https:\/\/edit\.framer\.com[^>]*><\/script>/g, "");
html = html.replace(/<script[^>]*src=["']https:\/\/www\.googletagmanager\.com[^>]*><\/script>/g, "");
html = html.replace(/<link[^>]*href=["']https:\/\/fonts\.googleapis\.com[^>]*>/g, "");
html = html.replace(/<link[^>]*href=["']https:\/\/fonts\.gstatic\.com[^>]*>/g, "");

// Удаляем любые remnant-скрипты Framer
html = html.replace(/<script[^>]*src=["']https:\/\/framer\.com\/m\/[a-zA-Z0-9\/_\-.]+["'][^>]*><\/script>/g, "");

// Обновляем пути к srcset
html = html.replace(/srcset=["']https:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9._%-]+)[^"']*["']/g, 'src="./assets/$1"');

// Сохраняем обновлённый HTML
fs.writeFileSync(indexPath, html, "utf-8");
console.log("✅ index.html обновлён для оффлайн-режима");
