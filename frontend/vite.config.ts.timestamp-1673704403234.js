// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve as resolve3 } from "path";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// package.json
var package_default = {
  name: "catch-me-if-you-can-web-extension",
  displayName: "Catch me if you can",
  version: "1.0.0",
  description: "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/Ducksss/Catch-Me-If-You-Can"
  },
  scripts: {
    build: "tsc --noEmit && vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@mui/material": "^5.11.4",
    react: "^18.2.0",
    "react-dom": "^18.2.0"
  },
  devDependencies: {
    "@iconify/react": "^4.0.1",
    "@types/chrome": "^0.0.180",
    "@types/node": "^17.0.23",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.18.0",
    "@typescript-eslint/parser": "^5.18.0",
    "@vitejs/plugin-react": "^1.3.0",
    autoprefixer: "^10.4.4",
    eslint: "^8.13.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-import": "^2.25.4",
    "eslint-plugin-jsx-a11y": "^6.5.1",
    "eslint-plugin-react": "^7.23.0",
    "eslint-plugin-react-hooks": "^4.3.0",
    "fs-extra": "^10.0.0",
    nodemon: "^2.0.18",
    postcss: "^8.4.12",
    prettier: "2.8.3",
    sass: "^1.57.1",
    tailwindcss: "^3.0.24",
    "ts-node": "^10.7.0",
    typescript: "^4.5.5",
    vite: "^2.9.15"
  }
};

// src/manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.displayName,
  version: package_default.version,
  description: package_default.description,
  permissions: ["storage", "activeTab", "scripting", "tabs"],
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png"
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["contentStyle.css", "icon-128.png", "icon-34.png"],
      matches: []
    }
  ]
};
var manifest_default = manifest;

// utils/plugins/make-manifest.ts
var { resolve } = path;
var outDir = resolve("/Users/keiloktql/Documents/Coding/Catch-Me-If-You-Can/frontend/utils/plugins", "..", "..", "public");
function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, "manifest.json");
      fs.writeFileSync(manifestPath, JSON.stringify(manifest_default, null, 2));
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// utils/plugins/copy-content-style.ts
import * as fs2 from "fs";
import * as path2 from "path";
var { resolve: resolve2 } = path2;
var root = resolve2("/Users/keiloktql/Documents/Coding/Catch-Me-If-You-Can/frontend/utils/plugins", "..", "..");
var contentStyle = resolve2(root, "src", "pages", "content", "style.css");
var outDir2 = resolve2("/Users/keiloktql/Documents/Coding/Catch-Me-If-You-Can/frontend/utils/plugins", "..", "..", "public");
function copyContentStyle() {
  return {
    name: "make-manifest",
    buildEnd() {
      fs2.copyFileSync(contentStyle, resolve2(outDir2, "contentStyle.css"));
      colorLog("contentStyle copied", "success");
    }
  };
}

// vite.config.ts
var root2 = resolve3("/Users/keiloktql/Documents/Coding/Catch-Me-If-You-Can/frontend", "src");
var pagesDir = resolve3(root2, "pages");
var assetsDir = resolve3(root2, "assets");
var outDir3 = resolve3("/Users/keiloktql/Documents/Coding/Catch-Me-If-You-Can/frontend", "dist");
var publicDir = resolve3("/Users/keiloktql/Documents/Coding/Catch-Me-If-You-Can/frontend", "public");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root2,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [react(), makeManifest(), copyContentStyle()],
  publicDir,
  build: {
    outDir: outDir3,
    sourcemap: process.env.__DEV__ === "true",
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        content: resolve3(pagesDir, "content", "index.ts"),
        background: resolve3(pagesDir, "background", "index.ts"),
        foreground: resolve3(pagesDir, "foreground", "index.ts"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html")
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJzcmMvbWFuaWZlc3QudHMiLCAidXRpbHMvcGx1Z2lucy9jb3B5LWNvbnRlbnQtc3R5bGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSBcIi4vdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0XCI7XG5pbXBvcnQgY29weUNvbnRlbnRTdHlsZSBmcm9tIFwiLi91dGlscy9wbHVnaW5zL2NvcHktY29udGVudC1zdHlsZVwiO1xuXG5jb25zdCByb290ID0gcmVzb2x2ZShcIi9Vc2Vycy9rZWlsb2t0cWwvRG9jdW1lbnRzL0NvZGluZy9DYXRjaC1NZS1JZi1Zb3UtQ2FuL2Zyb250ZW5kXCIsIFwic3JjXCIpO1xuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShcIi9Vc2Vycy9rZWlsb2t0cWwvRG9jdW1lbnRzL0NvZGluZy9DYXRjaC1NZS1JZi1Zb3UtQ2FuL2Zyb250ZW5kXCIsIFwiZGlzdFwiKTtcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoXCIvVXNlcnMva2VpbG9rdHFsL0RvY3VtZW50cy9Db2RpbmcvQ2F0Y2gtTWUtSWYtWW91LUNhbi9mcm9udGVuZFwiLCBcInB1YmxpY1wiKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBzcmNcIjogcm9vdCxcbiAgICAgICAgICAgIFwiQGFzc2V0c1wiOiBhc3NldHNEaXIsXG4gICAgICAgICAgICBcIkBwYWdlc1wiOiBwYWdlc0RpclxuICAgICAgICB9XG4gICAgfSxcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgbWFrZU1hbmlmZXN0KCksIGNvcHlDb250ZW50U3R5bGUoKV0sXG4gICAgcHVibGljRGlyLFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIG91dERpcixcbiAgICAgICAgc291cmNlbWFwOiBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIixcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBkZXZ0b29sczogcmVzb2x2ZShwYWdlc0RpciwgXCJkZXZ0b29sc1wiLCBcImluZGV4Lmh0bWxcIiksXG4gICAgICAgICAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsIFwicGFuZWxcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlc29sdmUocGFnZXNEaXIsIFwiY29udGVudFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsIFwiYmFja2dyb3VuZFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsIFwiZm9yZWdyb3VuZFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgICAgICAgICAgIHBvcHVwOiByZXNvbHZlKHBhZ2VzRGlyLCBcInBvcHVwXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgICAgICAgICBuZXd0YWI6IHJlc29sdmUocGFnZXNEaXIsIFwibmV3dGFiXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiByZXNvbHZlKHBhZ2VzRGlyLCBcIm9wdGlvbnNcIiwgXCJpbmRleC5odG1sXCIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVuaykgPT4gYHNyYy9wYWdlcy8ke2NodW5rLm5hbWV9L2luZGV4LmpzYFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCAiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4uLy4uL3NyYy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcblxuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoO1xuXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKFwiL1VzZXJzL2tlaWxva3RxbC9Eb2N1bWVudHMvQ29kaW5nL0NhdGNoLU1lLUlmLVlvdS1DYW4vZnJvbnRlbmQvdXRpbHMvcGx1Z2luc1wiLCAnLi4nLCAnLi4nLCAncHVibGljJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VNYW5pZmVzdCgpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdtYWtlLW1hbmlmZXN0JyxcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXREaXIpKSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhvdXREaXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYW5pZmVzdFBhdGggPSByZXNvbHZlKG91dERpciwgJ21hbmlmZXN0Lmpzb24nKTtcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdFBhdGgsIEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0LCBudWxsLCAyKSk7XG5cbiAgICAgIGNvbG9yTG9nKGBNYW5pZmVzdCBmaWxlIGNvcHkgY29tcGxldGU6ICR7bWFuaWZlc3RQYXRofWAsICdzdWNjZXNzJyk7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJ0eXBlIENvbG9yVHlwZSA9ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICdlcnJvcicgfCAnd2FybmluZycgfCBrZXlvZiB0eXBlb2YgQ09MT1JTO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvckxvZyhtZXNzYWdlOiBzdHJpbmcsIHR5cGU/OiBDb2xvclR5cGUpIHtcbiAgbGV0IGNvbG9yOiBzdHJpbmcgPSB0eXBlIHx8IENPTE9SUy5GZ0JsYWNrO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdHcmVlbjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2luZm8nOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdCbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZXJyb3InOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdSZWQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnWWVsbG93O1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBjb25zb2xlLmxvZyhjb2xvciwgbWVzc2FnZSk7XG59XG5cbmNvbnN0IENPTE9SUyA9IHtcbiAgUmVzZXQ6ICdcXHgxYlswbScsXG4gIEJyaWdodDogJ1xceDFiWzFtJyxcbiAgRGltOiAnXFx4MWJbMm0nLFxuICBVbmRlcnNjb3JlOiAnXFx4MWJbNG0nLFxuICBCbGluazogJ1xceDFiWzVtJyxcbiAgUmV2ZXJzZTogJ1xceDFiWzdtJyxcbiAgSGlkZGVuOiAnXFx4MWJbOG0nLFxuICBGZ0JsYWNrOiAnXFx4MWJbMzBtJyxcbiAgRmdSZWQ6ICdcXHgxYlszMW0nLFxuICBGZ0dyZWVuOiAnXFx4MWJbMzJtJyxcbiAgRmdZZWxsb3c6ICdcXHgxYlszM20nLFxuICBGZ0JsdWU6ICdcXHgxYlszNG0nLFxuICBGZ01hZ2VudGE6ICdcXHgxYlszNW0nLFxuICBGZ0N5YW46ICdcXHgxYlszNm0nLFxuICBGZ1doaXRlOiAnXFx4MWJbMzdtJyxcbiAgQmdCbGFjazogJ1xceDFiWzQwbScsXG4gIEJnUmVkOiAnXFx4MWJbNDFtJyxcbiAgQmdHcmVlbjogJ1xceDFiWzQybScsXG4gIEJnWWVsbG93OiAnXFx4MWJbNDNtJyxcbiAgQmdCbHVlOiAnXFx4MWJbNDRtJyxcbiAgQmdNYWdlbnRhOiAnXFx4MWJbNDVtJyxcbiAgQmdDeWFuOiAnXFx4MWJbNDZtJyxcbiAgQmdXaGl0ZTogJ1xceDFiWzQ3bScsXG59IGFzIGNvbnN0O1xuIiwgImltcG9ydCBwa2cgZnJvbSBcIi4uL3BhY2thZ2UuanNvblwiO1xuaW1wb3J0IHsgTWFuaWZlc3RUeXBlIH0gZnJvbSBcIkBzcmMvbWFuaWZlc3QtdHlwZVwiO1xuXG5jb25zdCBtYW5pZmVzdDogTWFuaWZlc3RUeXBlID0ge1xuICAgIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gICAgbmFtZTogcGtnLmRpc3BsYXlOYW1lLFxuICAgIHZlcnNpb246IHBrZy52ZXJzaW9uLFxuICAgIGRlc2NyaXB0aW9uOiBwa2cuZGVzY3JpcHRpb24sXG4gICAgcGVybWlzc2lvbnM6IFtcInN0b3JhZ2VcIiwgXCJhY3RpdmVUYWJcIiwgXCJzY3JpcHRpbmdcIiwgXCJ0YWJzXCJdLFxuICAgIG9wdGlvbnNfcGFnZTogXCJzcmMvcGFnZXMvb3B0aW9ucy9pbmRleC5odG1sXCIsXG4gICAgYmFja2dyb3VuZDoge1xuICAgICAgICBzZXJ2aWNlX3dvcmtlcjogXCJzcmMvcGFnZXMvYmFja2dyb3VuZC9pbmRleC5qc1wiLFxuICAgICAgICB0eXBlOiBcIm1vZHVsZVwiXG4gICAgfSxcbiAgICBhY3Rpb246IHtcbiAgICAgICAgZGVmYXVsdF9wb3B1cDogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiLFxuICAgICAgICBkZWZhdWx0X2ljb246IFwiaWNvbi0zNC5wbmdcIlxuICAgIH0sXG4gICAgY2hyb21lX3VybF9vdmVycmlkZXM6IHtcbiAgICAgICAgbmV3dGFiOiBcInNyYy9wYWdlcy9uZXd0YWIvaW5kZXguaHRtbFwiXG4gICAgfSxcbiAgICBpY29uczoge1xuICAgICAgICBcIjEyOFwiOiBcImljb24tMTI4LnBuZ1wiXG4gICAgfSxcbiAgICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbWF0Y2hlczogW1wiaHR0cDovLyovKlwiLCBcImh0dHBzOi8vKi8qXCIsIFwiPGFsbF91cmxzPlwiXSxcbiAgICAgICAgICAgIGpzOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC5qc1wiXSxcbiAgICAgICAgICAgIGNzczogW1wiY29udGVudFN0eWxlLmNzc1wiXVxuICAgICAgICB9XG4gICAgXSxcbiAgICBkZXZ0b29sc19wYWdlOiBcInNyYy9wYWdlcy9kZXZ0b29scy9pbmRleC5odG1sXCIsXG4gICAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlc291cmNlczogW1wiY29udGVudFN0eWxlLmNzc1wiLCBcImljb24tMTI4LnBuZ1wiLCBcImljb24tMzQucG5nXCJdLFxuICAgICAgICAgICAgbWF0Y2hlczogW11cbiAgICAgICAgfVxuICAgIF1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xuIiwgImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY29sb3JMb2cgZnJvbSAnLi4vbG9nJztcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnO1xuXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKFwiL1VzZXJzL2tlaWxva3RxbC9Eb2N1bWVudHMvQ29kaW5nL0NhdGNoLU1lLUlmLVlvdS1DYW4vZnJvbnRlbmQvdXRpbHMvcGx1Z2luc1wiLCAnLi4nLCAnLi4nKTtcbmNvbnN0IGNvbnRlbnRTdHlsZSA9IHJlc29sdmUocm9vdCwgJ3NyYycsICdwYWdlcycsICdjb250ZW50JywgJ3N0eWxlLmNzcycpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShcIi9Vc2Vycy9rZWlsb2t0cWwvRG9jdW1lbnRzL0NvZGluZy9DYXRjaC1NZS1JZi1Zb3UtQ2FuL2Zyb250ZW5kL3V0aWxzL3BsdWdpbnNcIiwgJy4uJywgJy4uJywgJ3B1YmxpYycpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3B5Q29udGVudFN0eWxlKCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ21ha2UtbWFuaWZlc3QnLFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgZnMuY29weUZpbGVTeW5jKGNvbnRlbnRTdHlsZSwgcmVzb2x2ZShvdXREaXIsICdjb250ZW50U3R5bGUuY3NzJykpO1xuXG4gICAgICBjb2xvckxvZygnY29udGVudFN0eWxlIGNvcGllZCcsICdzdWNjZXNzJyk7XG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFBQSxnQkFBZTs7O0FDRnhCLFlBQVksUUFBUTtBQUNwQixZQUFZLFVBQVU7OztBQ0NQLFNBQVIsU0FBMEIsU0FBaUIsTUFBa0I7QUFDbEUsTUFBSSxRQUFnQixRQUFRLE9BQU87QUFFbkMsVUFBUTtBQUFBLFNBQ0Q7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLFNBQ0c7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLFNBQ0c7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLFNBQ0c7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBO0FBR0osVUFBUSxJQUFJLE9BQU8sT0FBTztBQUM1QjtBQUVBLElBQU0sU0FBUztBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsS0FBSztBQUFBLEVBQ0wsWUFBWTtBQUFBLEVBQ1osT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1IsU0FB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QSxFQUN4QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxRQUFRRDtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLElBQ2Q7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQztBQUFBLEVBQ3JEO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFBRTtBQUFBLElBQ0EsV0FBVyxRQUFRLElBQUksWUFBWTtBQUFBLElBQ25DLGVBQWU7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNILFVBQVVELFNBQVEsVUFBVSxZQUFZLFlBQVk7QUFBQSxRQUNwRCxPQUFPQSxTQUFRLFVBQVUsU0FBUyxZQUFZO0FBQUEsUUFDOUMsU0FBU0EsU0FBUSxVQUFVLFdBQVcsVUFBVTtBQUFBLFFBQ2hELFlBQVlBLFNBQVEsVUFBVSxjQUFjLFVBQVU7QUFBQSxRQUN0RCxZQUFZQSxTQUFRLFVBQVUsY0FBYyxVQUFVO0FBQUEsUUFDdEQsT0FBT0EsU0FBUSxVQUFVLFNBQVMsWUFBWTtBQUFBLFFBQzlDLFFBQVFBLFNBQVEsVUFBVSxVQUFVLFlBQVk7QUFBQSxRQUNoRCxTQUFTQSxTQUFRLFVBQVUsV0FBVyxZQUFZO0FBQUEsTUFDdEQ7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNKLGdCQUFnQixDQUFDLFVBQVUsYUFBYSxNQUFNO0FBQUEsTUFDbEQ7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAiZnMiLCAicGF0aCIsICJyZXNvbHZlIiwgInBhdGgiLCAib3V0RGlyIiwgInJvb3QiLCAicmVzb2x2ZSIsICJvdXREaXIiXQp9Cg==
