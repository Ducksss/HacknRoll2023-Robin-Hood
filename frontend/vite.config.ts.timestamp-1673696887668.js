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
    react: "^18.2.0",
    "react-dom": "^18.2.0"
  },
  devDependencies: {
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
    tailwindcss: "^3.0.24",
    "ts-node": "^10.7.0",
    typescript: "^4.5.5",
    vite: "^2.9.15"
  }
};

// src/manifest.ts
var manifest = {
  manifest_version: 2,
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
  devtools_page: "src/pages/devtools/index.html"
};
var manifest_default = manifest;

// utils/plugins/make-manifest.ts
var { resolve } = path;
var outDir = resolve("/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/frontend/utils/plugins", "..", "..", "public");
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
var root = resolve2("/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/frontend/utils/plugins", "..", "..");
var contentStyle = resolve2(root, "src", "pages", "content", "style.css");
var outDir2 = resolve2("/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/frontend/utils/plugins", "..", "..", "public");
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
var root2 = resolve3("/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/frontend", "src");
var pagesDir = resolve3(root2, "pages");
var assetsDir = resolve3(root2, "assets");
var outDir3 = resolve3("/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/frontend", "dist");
var publicDir = resolve3("/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/frontend", "public");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJzcmMvbWFuaWZlc3QudHMiLCAidXRpbHMvcGx1Z2lucy9jb3B5LWNvbnRlbnQtc3R5bGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSBcIi4vdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0XCI7XG5pbXBvcnQgY29weUNvbnRlbnRTdHlsZSBmcm9tIFwiLi91dGlscy9wbHVnaW5zL2NvcHktY29udGVudC1zdHlsZVwiO1xuXG5jb25zdCByb290ID0gcmVzb2x2ZShcIi9Vc2Vycy9DaGFpUGluWmhlbmcvRGV2L0NhdGNoLU1lLUlmLVlvdS1DYW4vZnJvbnRlbmRcIiwgXCJzcmNcIik7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgXCJwYWdlc1wiKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKFwiL1VzZXJzL0NoYWlQaW5aaGVuZy9EZXYvQ2F0Y2gtTWUtSWYtWW91LUNhbi9mcm9udGVuZFwiLCBcImRpc3RcIik7XG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKFwiL1VzZXJzL0NoYWlQaW5aaGVuZy9EZXYvQ2F0Y2gtTWUtSWYtWW91LUNhbi9mcm9udGVuZFwiLCBcInB1YmxpY1wiKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBzcmNcIjogcm9vdCxcbiAgICAgICAgICAgIFwiQGFzc2V0c1wiOiBhc3NldHNEaXIsXG4gICAgICAgICAgICBcIkBwYWdlc1wiOiBwYWdlc0RpclxuICAgICAgICB9XG4gICAgfSxcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgbWFrZU1hbmlmZXN0KCksIGNvcHlDb250ZW50U3R5bGUoKV0sXG4gICAgcHVibGljRGlyLFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIG91dERpcixcbiAgICAgICAgc291cmNlbWFwOiBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIixcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBkZXZ0b29sczogcmVzb2x2ZShwYWdlc0RpciwgXCJkZXZ0b29sc1wiLCBcImluZGV4Lmh0bWxcIiksXG4gICAgICAgICAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsIFwicGFuZWxcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlc29sdmUocGFnZXNEaXIsIFwiY29udGVudFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsIFwiYmFja2dyb3VuZFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsIFwiZm9yZWdyb3VuZFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgICAgICAgICAgIHBvcHVwOiByZXNvbHZlKHBhZ2VzRGlyLCBcInBvcHVwXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgICAgICAgICBuZXd0YWI6IHJlc29sdmUocGFnZXNEaXIsIFwibmV3dGFiXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiByZXNvbHZlKHBhZ2VzRGlyLCBcIm9wdGlvbnNcIiwgXCJpbmRleC5odG1sXCIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVuaykgPT4gYHNyYy9wYWdlcy8ke2NodW5rLm5hbWV9L2luZGV4LmpzYFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCAiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4uLy4uL3NyYy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcblxuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoO1xuXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKFwiL1VzZXJzL0NoYWlQaW5aaGVuZy9EZXYvQ2F0Y2gtTWUtSWYtWW91LUNhbi9mcm9udGVuZC91dGlscy9wbHVnaW5zXCIsICcuLicsICcuLicsICdwdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ21ha2UtbWFuaWZlc3QnLFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKG91dERpcikpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKG91dERpcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHJlc29sdmUob3V0RGlyLCAnbWFuaWZlc3QuanNvbicpO1xuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkobWFuaWZlc3QsIG51bGwsIDIpKTtcblxuICAgICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgJ3N1Y2Nlc3MnKTtcbiAgICB9LFxuICB9O1xufVxuIiwgInR5cGUgQ29sb3JUeXBlID0gJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICd3YXJuaW5nJyB8IGtleW9mIHR5cGVvZiBDT0xPUlM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yTG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZT86IENvbG9yVHlwZSkge1xuICBsZXQgY29sb3I6IHN0cmluZyA9IHR5cGUgfHwgQ09MT1JTLkZnQmxhY2s7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlcnJvcic6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGNvbG9yLCBtZXNzYWdlKTtcbn1cblxuY29uc3QgQ09MT1JTID0ge1xuICBSZXNldDogJ1xceDFiWzBtJyxcbiAgQnJpZ2h0OiAnXFx4MWJbMW0nLFxuICBEaW06ICdcXHgxYlsybScsXG4gIFVuZGVyc2NvcmU6ICdcXHgxYls0bScsXG4gIEJsaW5rOiAnXFx4MWJbNW0nLFxuICBSZXZlcnNlOiAnXFx4MWJbN20nLFxuICBIaWRkZW46ICdcXHgxYls4bScsXG4gIEZnQmxhY2s6ICdcXHgxYlszMG0nLFxuICBGZ1JlZDogJ1xceDFiWzMxbScsXG4gIEZnR3JlZW46ICdcXHgxYlszMm0nLFxuICBGZ1llbGxvdzogJ1xceDFiWzMzbScsXG4gIEZnQmx1ZTogJ1xceDFiWzM0bScsXG4gIEZnTWFnZW50YTogJ1xceDFiWzM1bScsXG4gIEZnQ3lhbjogJ1xceDFiWzM2bScsXG4gIEZnV2hpdGU6ICdcXHgxYlszN20nLFxuICBCZ0JsYWNrOiAnXFx4MWJbNDBtJyxcbiAgQmdSZWQ6ICdcXHgxYls0MW0nLFxuICBCZ0dyZWVuOiAnXFx4MWJbNDJtJyxcbiAgQmdZZWxsb3c6ICdcXHgxYls0M20nLFxuICBCZ0JsdWU6ICdcXHgxYls0NG0nLFxuICBCZ01hZ2VudGE6ICdcXHgxYls0NW0nLFxuICBCZ0N5YW46ICdcXHgxYls0Nm0nLFxuICBCZ1doaXRlOiAnXFx4MWJbNDdtJyxcbn0gYXMgY29uc3Q7XG4iLCAiaW1wb3J0IHBrZyBmcm9tIFwiLi4vcGFja2FnZS5qc29uXCI7XG5pbXBvcnQgeyBNYW5pZmVzdFR5cGUgfSBmcm9tIFwiQHNyYy9tYW5pZmVzdC10eXBlXCI7XG5cbmNvbnN0IG1hbmlmZXN0OiBNYW5pZmVzdFR5cGUgPSB7XG4gICAgbWFuaWZlc3RfdmVyc2lvbjogMixcbiAgICBuYW1lOiBwa2cuZGlzcGxheU5hbWUsXG4gICAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG4gICAgZGVzY3JpcHRpb246IHBrZy5kZXNjcmlwdGlvbixcbiAgICBwZXJtaXNzaW9uczogW1wic3RvcmFnZVwiLCBcImFjdGl2ZVRhYlwiLCBcInNjcmlwdGluZ1wiLCBcInRhYnNcIl0sXG4gICAgb3B0aW9uc19wYWdlOiBcInNyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWxcIixcbiAgICBiYWNrZ3JvdW5kOiB7XG4gICAgICAgIHNlcnZpY2Vfd29ya2VyOiBcInNyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LmpzXCIsXG4gICAgICAgIHR5cGU6IFwibW9kdWxlXCJcbiAgICB9LFxuICAgIGFjdGlvbjoge1xuICAgICAgICBkZWZhdWx0X3BvcHVwOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCIsXG4gICAgICAgIGRlZmF1bHRfaWNvbjogXCJpY29uLTM0LnBuZ1wiXG4gICAgfSxcbiAgICBjaHJvbWVfdXJsX292ZXJyaWRlczoge1xuICAgICAgICBuZXd0YWI6IFwic3JjL3BhZ2VzL25ld3RhYi9pbmRleC5odG1sXCJcbiAgICB9LFxuICAgIGljb25zOiB7XG4gICAgICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCJcbiAgICB9LFxuICAgIGNvbnRlbnRfc2NyaXB0czogW1xuICAgICAgICB7XG4gICAgICAgICAgICBtYXRjaGVzOiBbXCJodHRwOi8vKi8qXCIsIFwiaHR0cHM6Ly8qLypcIiwgXCI8YWxsX3VybHM+XCJdLFxuICAgICAgICAgICAganM6IFtcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LmpzXCJdLFxuICAgICAgICAgICAgY3NzOiBbXCJjb250ZW50U3R5bGUuY3NzXCJdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGRldnRvb2xzX3BhZ2U6IFwic3JjL3BhZ2VzL2RldnRvb2xzL2luZGV4Lmh0bWxcIlxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFuaWZlc3Q7XG4iLCAiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XG5cbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aDtcblxuY29uc3Qgcm9vdCA9IHJlc29sdmUoXCIvVXNlcnMvQ2hhaVBpblpoZW5nL0Rldi9DYXRjaC1NZS1JZi1Zb3UtQ2FuL2Zyb250ZW5kL3V0aWxzL3BsdWdpbnNcIiwgJy4uJywgJy4uJyk7XG5jb25zdCBjb250ZW50U3R5bGUgPSByZXNvbHZlKHJvb3QsICdzcmMnLCAncGFnZXMnLCAnY29udGVudCcsICdzdHlsZS5jc3MnKTtcbmNvbnN0IG91dERpciA9IHJlc29sdmUoXCIvVXNlcnMvQ2hhaVBpblpoZW5nL0Rldi9DYXRjaC1NZS1JZi1Zb3UtQ2FuL2Zyb250ZW5kL3V0aWxzL3BsdWdpbnNcIiwgJy4uJywgJy4uJywgJ3B1YmxpYycpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3B5Q29udGVudFN0eWxlKCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ21ha2UtbWFuaWZlc3QnLFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgZnMuY29weUZpbGVTeW5jKGNvbnRlbnRTdHlsZSwgcmVzb2x2ZShvdXREaXIsICdjb250ZW50U3R5bGUuY3NzJykpO1xuXG4gICAgICBjb2xvckxvZygnY29udGVudFN0eWxlIGNvcGllZCcsICdzdWNjZXNzJyk7XG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFBQSxnQkFBZTs7O0FDRnhCLFlBQVksUUFBUTtBQUNwQixZQUFZLFVBQVU7OztBQ0NQLFNBQVIsU0FBMEIsU0FBaUIsTUFBa0I7QUFDbEUsTUFBSSxRQUFnQixRQUFRLE9BQU87QUFFbkMsVUFBUTtBQUFBLFNBQ0Q7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLFNBQ0c7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLFNBQ0c7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLFNBQ0c7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBO0FBR0osVUFBUSxJQUFJLE9BQU8sT0FBTztBQUM1QjtBQUVBLElBQU0sU0FBUztBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsS0FBSztBQUFBLEVBQ0wsWUFBWTtBQUFBLEVBQ1osT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBLElBQU0sV0FBeUI7QUFBQSxFQUMzQixrQkFBa0I7QUFBQSxFQUNsQixNQUFNLGdCQUFJO0FBQUEsRUFDVixTQUFTLGdCQUFJO0FBQUEsRUFDYixhQUFhLGdCQUFJO0FBQUEsRUFDakIsYUFBYSxDQUFDLFdBQVcsYUFBYSxhQUFhLE1BQU07QUFBQSxFQUN6RCxjQUFjO0FBQUEsRUFDZCxZQUFZO0FBQUEsSUFDUixnQkFBZ0I7QUFBQSxJQUNoQixNQUFNO0FBQUEsRUFDVjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLEVBQ2xCO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxJQUNsQixRQUFRO0FBQUEsRUFDWjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsT0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2I7QUFBQSxNQUNJLFNBQVMsQ0FBQyxjQUFjLGVBQWUsWUFBWTtBQUFBLE1BQ25ELElBQUksQ0FBQyw0QkFBNEI7QUFBQSxNQUNqQyxLQUFLLENBQUMsa0JBQWtCO0FBQUEsSUFDNUI7QUFBQSxFQUNKO0FBQUEsRUFDQSxlQUFlO0FBQ25CO0FBRUEsSUFBTyxtQkFBUTs7O0FGNUJmLElBQU0sRUFBRSxRQUFRLElBQUk7QUFFcEIsSUFBTSxTQUFTLFFBQVEsc0VBQXNFLE1BQU0sTUFBTSxRQUFRO0FBRWxHLFNBQVIsZUFBOEM7QUFDbkQsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sV0FBVztBQUNULFVBQUksQ0FBSSxjQUFXLE1BQU0sR0FBRztBQUMxQixRQUFHLGFBQVUsTUFBTTtBQUFBLE1BQ3JCO0FBRUEsWUFBTSxlQUFlLFFBQVEsUUFBUSxlQUFlO0FBRXBELE1BQUcsaUJBQWMsY0FBYyxLQUFLLFVBQVUsa0JBQVUsTUFBTSxDQUFDLENBQUM7QUFFaEUsZUFBUyxnQ0FBZ0MsZ0JBQWdCLFNBQVM7QUFBQSxJQUNwRTtBQUFBLEVBQ0Y7QUFDRjs7O0FHekJBLFlBQVlDLFNBQVE7QUFDcEIsWUFBWUMsV0FBVTtBQUl0QixJQUFNLEVBQUUsU0FBQUMsU0FBUSxJQUFJQztBQUVwQixJQUFNLE9BQU9ELFNBQVEsc0VBQXNFLE1BQU0sSUFBSTtBQUNyRyxJQUFNLGVBQWVBLFNBQVEsTUFBTSxPQUFPLFNBQVMsV0FBVyxXQUFXO0FBQ3pFLElBQU1FLFVBQVNGLFNBQVEsc0VBQXNFLE1BQU0sTUFBTSxRQUFRO0FBRWxHLFNBQVIsbUJBQWtEO0FBQ3ZELFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFDVCxNQUFHLGlCQUFhLGNBQWNBLFNBQVFFLFNBQVEsa0JBQWtCLENBQUM7QUFFakUsZUFBUyx1QkFBdUIsU0FBUztBQUFBLElBQzNDO0FBQUEsRUFDRjtBQUNGOzs7QUpkQSxJQUFNQyxRQUFPQyxTQUFRLHdEQUF3RCxLQUFLO0FBQ2xGLElBQU0sV0FBV0EsU0FBUUQsT0FBTSxPQUFPO0FBQ3RDLElBQU0sWUFBWUMsU0FBUUQsT0FBTSxRQUFRO0FBQ3hDLElBQU1FLFVBQVNELFNBQVEsd0RBQXdELE1BQU07QUFDckYsSUFBTSxZQUFZQSxTQUFRLHdEQUF3RCxRQUFRO0FBRTFGLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILFFBQVFEO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsSUFDZDtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsYUFBYSxHQUFHLGlCQUFpQixDQUFDO0FBQUEsRUFDckQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFFBQUFFO0FBQUEsSUFDQSxXQUFXLFFBQVEsSUFBSSxZQUFZO0FBQUEsSUFDbkMsZUFBZTtBQUFBLE1BQ1gsT0FBTztBQUFBLFFBQ0gsVUFBVUQsU0FBUSxVQUFVLFlBQVksWUFBWTtBQUFBLFFBQ3BELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxTQUFTQSxTQUFRLFVBQVUsV0FBVyxVQUFVO0FBQUEsUUFDaEQsWUFBWUEsU0FBUSxVQUFVLGNBQWMsVUFBVTtBQUFBLFFBQ3RELFlBQVlBLFNBQVEsVUFBVSxjQUFjLFVBQVU7QUFBQSxRQUN0RCxPQUFPQSxTQUFRLFVBQVUsU0FBUyxZQUFZO0FBQUEsUUFDOUMsUUFBUUEsU0FBUSxVQUFVLFVBQVUsWUFBWTtBQUFBLFFBQ2hELFNBQVNBLFNBQVEsVUFBVSxXQUFXLFlBQVk7QUFBQSxNQUN0RDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ0osZ0JBQWdCLENBQUMsVUFBVSxhQUFhLE1BQU07QUFBQSxNQUNsRDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFsicmVzb2x2ZSIsICJmcyIsICJwYXRoIiwgInJlc29sdmUiLCAicGF0aCIsICJvdXREaXIiLCAicm9vdCIsICJyZXNvbHZlIiwgIm91dERpciJdCn0K
