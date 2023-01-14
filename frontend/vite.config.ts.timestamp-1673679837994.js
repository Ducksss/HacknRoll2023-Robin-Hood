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
    description:
        "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
    license: "MIT",
    repository: {
        type: "git",
        url: "https://github.com/Ducksss/Catch-Me-If-You-Can"
    },
    scripts: {
        build: "tsc --noEmit && vite build",
        dev: "nodemon",
        prepare: "husky install"
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
        eslint: "^8.31.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-import": "^2.25.4",
        "eslint-plugin-jsx-a11y": "^6.5.1",
        "eslint-plugin-react": "^7.23.0",
        "eslint-plugin-react-hooks": "^4.3.0",
        "fs-extra": "^10.0.0",
        husky: "^8.0.0",
        "lint-staged": "^13.1.0",
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
    manifest_version: 3,
    name: package_default.displayName,
    version: package_default.version,
    description: package_default.description,
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
        128: "icon-128.png"
    },
    content_scripts: [
        {
            matches: ["http://*/*", "https://*/*", "<all_urls>"],
            js: ["src/pages/content/index.js"],
            css: ["contentStyle.css"]
        }
    ]
};
var manifest_default = manifest;

// utils/plugins/make-manifest.ts
var { resolve } = path;
var outDir = resolve(
    "/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/utils/plugins",
    "..",
    "..",
    "public"
);
function makeManifest() {
    return {
        name: "make-manifest",
        buildEnd() {
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir);
            }
            const manifestPath = resolve(outDir, "manifest.json");
            fs.writeFileSync(
                manifestPath,
                JSON.stringify(manifest_default, null, 2)
            );
            colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
        }
    };
}

// utils/plugins/copy-content-style.ts
import * as fs2 from "fs";
import * as path2 from "path";
var { resolve: resolve2 } = path2;
var root = resolve2(
    "/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/utils/plugins",
    "..",
    ".."
);
var contentStyle = resolve2(root, "src", "pages", "content", "style.css");
var outDir2 = resolve2(
    "/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can/utils/plugins",
    "..",
    "..",
    "public"
);
function copyContentStyle() {
    return {
        name: "make-manifest",
        buildEnd() {
            fs2.copyFileSync(
                contentStyle,
                resolve2(outDir2, "contentStyle.css")
            );
            colorLog("contentStyle copied", "success");
        }
    };
}

// vite.config.ts
var root2 = resolve3("/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can", "src");
var pagesDir = resolve3(root2, "pages");
var assetsDir = resolve3(root2, "assets");
var outDir3 = resolve3("/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can", "dist");
var publicDir = resolve3(
    "/Users/ChaiPinZheng/Dev/Catch-Me-If-You-Can",
    "public"
);
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJzcmMvbWFuaWZlc3QudHMiLCAidXRpbHMvcGx1Z2lucy9jb3B5LWNvbnRlbnQtc3R5bGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSAnLi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QnO1xuaW1wb3J0IGNvcHlDb250ZW50U3R5bGUgZnJvbSAnLi91dGlscy9wbHVnaW5zL2NvcHktY29udGVudC1zdHlsZSc7XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKFwiL1VzZXJzL0NoYWlQaW5aaGVuZy9EZXYvQ2F0Y2gtTWUtSWYtWW91LUNhblwiLCAnc3JjJyk7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgJ3BhZ2VzJyk7XG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsICdhc3NldHMnKTtcbmNvbnN0IG91dERpciA9IHJlc29sdmUoXCIvVXNlcnMvQ2hhaVBpblpoZW5nL0Rldi9DYXRjaC1NZS1JZi1Zb3UtQ2FuXCIsICdkaXN0Jyk7XG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKFwiL1VzZXJzL0NoYWlQaW5aaGVuZy9EZXYvQ2F0Y2gtTWUtSWYtWW91LUNhblwiLCAncHVibGljJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAc3JjXCI6IHJvb3QsXG4gICAgICBcIkBhc3NldHNcIjogYXNzZXRzRGlyLFxuICAgICAgXCJAcGFnZXNcIjogcGFnZXNEaXIsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIG1ha2VNYW5pZmVzdCgpLCBjb3B5Q29udGVudFN0eWxlKCldLFxuICBwdWJsaWNEaXIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyLFxuICAgIHNvdXJjZW1hcDogcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gXCJ0cnVlXCIsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgZGV2dG9vbHM6IHJlc29sdmUocGFnZXNEaXIsICdkZXZ0b29scycsICdpbmRleC5odG1sJyksXG4gICAgICAgIHBhbmVsOiByZXNvbHZlKHBhZ2VzRGlyLCAncGFuZWwnLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCAnY29udGVudCcsICdpbmRleC50cycpLFxuICAgICAgICBiYWNrZ3JvdW5kOiByZXNvbHZlKHBhZ2VzRGlyLCAnYmFja2dyb3VuZCcsICdpbmRleC50cycpLFxuICAgICAgICBwb3B1cDogcmVzb2x2ZShwYWdlc0RpciwgJ3BvcHVwJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgbmV3dGFiOiByZXNvbHZlKHBhZ2VzRGlyLCAnbmV3dGFiJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgb3B0aW9uczogcmVzb2x2ZShwYWdlc0RpciwgJ29wdGlvbnMnLCAnaW5kZXguaHRtbCcpLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogKGNodW5rKSA9PiBgc3JjL3BhZ2VzLyR7Y2h1bmsubmFtZX0vaW5kZXguanNgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4uLy4uL3NyYy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcblxuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoO1xuXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKFwiL1VzZXJzL0NoYWlQaW5aaGVuZy9EZXYvQ2F0Y2gtTWUtSWYtWW91LUNhbi91dGlscy9wbHVnaW5zXCIsICcuLicsICcuLicsICdwdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ21ha2UtbWFuaWZlc3QnLFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKG91dERpcikpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKG91dERpcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHJlc29sdmUob3V0RGlyLCAnbWFuaWZlc3QuanNvbicpO1xuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkobWFuaWZlc3QsIG51bGwsIDIpKTtcblxuICAgICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgJ3N1Y2Nlc3MnKTtcbiAgICB9LFxuICB9O1xufVxuIiwgInR5cGUgQ29sb3JUeXBlID0gJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICd3YXJuaW5nJyB8IGtleW9mIHR5cGVvZiBDT0xPUlM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yTG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZT86IENvbG9yVHlwZSkge1xuICBsZXQgY29sb3I6IHN0cmluZyA9IHR5cGUgfHwgQ09MT1JTLkZnQmxhY2s7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlcnJvcic6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGNvbG9yLCBtZXNzYWdlKTtcbn1cblxuY29uc3QgQ09MT1JTID0ge1xuICBSZXNldDogJ1xceDFiWzBtJyxcbiAgQnJpZ2h0OiAnXFx4MWJbMW0nLFxuICBEaW06ICdcXHgxYlsybScsXG4gIFVuZGVyc2NvcmU6ICdcXHgxYls0bScsXG4gIEJsaW5rOiAnXFx4MWJbNW0nLFxuICBSZXZlcnNlOiAnXFx4MWJbN20nLFxuICBIaWRkZW46ICdcXHgxYls4bScsXG4gIEZnQmxhY2s6ICdcXHgxYlszMG0nLFxuICBGZ1JlZDogJ1xceDFiWzMxbScsXG4gIEZnR3JlZW46ICdcXHgxYlszMm0nLFxuICBGZ1llbGxvdzogJ1xceDFiWzMzbScsXG4gIEZnQmx1ZTogJ1xceDFiWzM0bScsXG4gIEZnTWFnZW50YTogJ1xceDFiWzM1bScsXG4gIEZnQ3lhbjogJ1xceDFiWzM2bScsXG4gIEZnV2hpdGU6ICdcXHgxYlszN20nLFxuICBCZ0JsYWNrOiAnXFx4MWJbNDBtJyxcbiAgQmdSZWQ6ICdcXHgxYls0MW0nLFxuICBCZ0dyZWVuOiAnXFx4MWJbNDJtJyxcbiAgQmdZZWxsb3c6ICdcXHgxYls0M20nLFxuICBCZ0JsdWU6ICdcXHgxYls0NG0nLFxuICBCZ01hZ2VudGE6ICdcXHgxYls0NW0nLFxuICBCZ0N5YW46ICdcXHgxYls0Nm0nLFxuICBCZ1doaXRlOiAnXFx4MWJbNDdtJyxcbn0gYXMgY29uc3Q7XG4iLCAiaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgTWFuaWZlc3RUeXBlIH0gZnJvbSAnQHNyYy9tYW5pZmVzdC10eXBlJztcblxuY29uc3QgbWFuaWZlc3Q6IE1hbmlmZXN0VHlwZSA9IHtcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgbmFtZTogcGtnLmRpc3BsYXlOYW1lLFxuICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcbiAgZGVzY3JpcHRpb246IHBrZy5kZXNjcmlwdGlvbixcbiAgb3B0aW9uc19wYWdlOiAnc3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbCcsXG4gIGJhY2tncm91bmQ6IHtcbiAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LmpzJyxcbiAgICB0eXBlOiAnbW9kdWxlJyxcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogJ3NyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sJyxcbiAgICBkZWZhdWx0X2ljb246ICdpY29uLTM0LnBuZycsXG4gIH0sXG4gIGNocm9tZV91cmxfb3ZlcnJpZGVzOiB7XG4gICAgbmV3dGFiOiAnc3JjL3BhZ2VzL25ld3RhYi9pbmRleC5odG1sJyxcbiAgfSxcbiAgaWNvbnM6IHtcbiAgICBcIjEyOFwiOiAnaWNvbi0xMjgucG5nJyxcbiAgfSxcbiAgY29udGVudF9zY3JpcHRzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogWydodHRwOi8vKi8qJywgJ2h0dHBzOi8vKi8qJywgJzxhbGxfdXJscz4nXSxcbiAgICAgIGpzOiBbJ3NyYy9wYWdlcy9jb250ZW50L2luZGV4LmpzJ10sXG4gICAgICBjc3M6IFsnY29udGVudFN0eWxlLmNzcyddLFxuICAgIH0sXG4gIF0sXG4gIGRldnRvb2xzX3BhZ2U6ICdzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbCcsXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xuICAgIHtcbiAgICAgIHJlc291cmNlczogWydjb250ZW50U3R5bGUuY3NzJywgJ2ljb24tMTI4LnBuZycsICdpY29uLTM0LnBuZyddLFxuICAgICAgbWF0Y2hlczogW10sXG4gICAgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xuIiwgImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY29sb3JMb2cgZnJvbSAnLi4vbG9nJztcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnO1xuXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKFwiL1VzZXJzL0NoYWlQaW5aaGVuZy9EZXYvQ2F0Y2gtTWUtSWYtWW91LUNhbi91dGlscy9wbHVnaW5zXCIsICcuLicsICcuLicpO1xuY29uc3QgY29udGVudFN0eWxlID0gcmVzb2x2ZShyb290LCAnc3JjJywgJ3BhZ2VzJywgJ2NvbnRlbnQnLCAnc3R5bGUuY3NzJyk7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKFwiL1VzZXJzL0NoYWlQaW5aaGVuZy9EZXYvQ2F0Y2gtTWUtSWYtWW91LUNhbi91dGlscy9wbHVnaW5zXCIsICcuLicsICcuLicsICdwdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29weUNvbnRlbnRTdHlsZSgpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdtYWtlLW1hbmlmZXN0JyxcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIGZzLmNvcHlGaWxlU3luYyhjb250ZW50U3R5bGUsIHJlc29sdmUob3V0RGlyLCAnY29udGVudFN0eWxlLmNzcycpKTtcblxuICAgICAgY29sb3JMb2coJ2NvbnRlbnRTdHlsZSBjb3BpZWQnLCAnc3VjY2VzcycpO1xuICAgIH0sXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsV0FBQUEsZ0JBQWU7OztBQ0Z4QixZQUFZLFFBQVE7QUFDcEIsWUFBWSxVQUFVOzs7QUNDUCxTQUFSLFNBQTBCLFNBQWlCLE1BQWtCO0FBQ2xFLE1BQUksUUFBZ0IsUUFBUSxPQUFPO0FBRW5DLFVBQVE7QUFBQSxTQUNEO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxTQUNHO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxTQUNHO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxTQUNHO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQTtBQUdKLFVBQVEsSUFBSSxPQUFPLE9BQU87QUFDNUI7QUFFQSxJQUFNLFNBQVM7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLEtBQUs7QUFBQSxFQUNMLFlBQVk7QUFBQSxFQUNaLE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQSxJQUFNLFdBQXlCO0FBQUEsRUFDN0Isa0JBQWtCO0FBQUEsRUFDbEIsTUFBTSxnQkFBSTtBQUFBLEVBQ1YsU0FBUyxnQkFBSTtBQUFBLEVBQ2IsYUFBYSxnQkFBSTtBQUFBLEVBQ2pCLGNBQWM7QUFBQSxFQUNkLFlBQVk7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLElBQ2hCLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLElBQ3BCLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsSUFDZjtBQUFBLE1BQ0UsU0FBUyxDQUFDLGNBQWMsZUFBZSxZQUFZO0FBQUEsTUFDbkQsSUFBSSxDQUFDLDRCQUE0QjtBQUFBLE1BQ2pDLEtBQUssQ0FBQyxrQkFBa0I7QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmLDBCQUEwQjtBQUFBLElBQ3hCO0FBQUEsTUFDRSxXQUFXLENBQUMsb0JBQW9CLGdCQUFnQixhQUFhO0FBQUEsTUFDN0QsU0FBUyxDQUFDO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sbUJBQVE7OztBRmpDZixJQUFNLEVBQUUsUUFBUSxJQUFJO0FBRXBCLElBQU0sU0FBUyxRQUFRLDZEQUE2RCxNQUFNLE1BQU0sUUFBUTtBQUV6RixTQUFSLGVBQThDO0FBQ25ELFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFDVCxVQUFJLENBQUksY0FBVyxNQUFNLEdBQUc7QUFDMUIsUUFBRyxhQUFVLE1BQU07QUFBQSxNQUNyQjtBQUVBLFlBQU0sZUFBZSxRQUFRLFFBQVEsZUFBZTtBQUVwRCxNQUFHLGlCQUFjLGNBQWMsS0FBSyxVQUFVLGtCQUFVLE1BQU0sQ0FBQyxDQUFDO0FBRWhFLGVBQVMsZ0NBQWdDLGdCQUFnQixTQUFTO0FBQUEsSUFDcEU7QUFBQSxFQUNGO0FBQ0Y7OztBR3pCQSxZQUFZQyxTQUFRO0FBQ3BCLFlBQVlDLFdBQVU7QUFJdEIsSUFBTSxFQUFFLFNBQUFDLFNBQVEsSUFBSUM7QUFFcEIsSUFBTSxPQUFPRCxTQUFRLDZEQUE2RCxNQUFNLElBQUk7QUFDNUYsSUFBTSxlQUFlQSxTQUFRLE1BQU0sT0FBTyxTQUFTLFdBQVcsV0FBVztBQUN6RSxJQUFNRSxVQUFTRixTQUFRLDZEQUE2RCxNQUFNLE1BQU0sUUFBUTtBQUV6RixTQUFSLG1CQUFrRDtBQUN2RCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQ1QsTUFBRyxpQkFBYSxjQUFjQSxTQUFRRSxTQUFRLGtCQUFrQixDQUFDO0FBRWpFLGVBQVMsdUJBQXVCLFNBQVM7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFDRjs7O0FKZEEsSUFBTUMsUUFBT0MsU0FBUSwrQ0FBK0MsS0FBSztBQUN6RSxJQUFNLFdBQVdBLFNBQVFELE9BQU0sT0FBTztBQUN0QyxJQUFNLFlBQVlDLFNBQVFELE9BQU0sUUFBUTtBQUN4QyxJQUFNRSxVQUFTRCxTQUFRLCtDQUErQyxNQUFNO0FBQzVFLElBQU0sWUFBWUEsU0FBUSwrQ0FBK0MsUUFBUTtBQUVqRixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRRDtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQztBQUFBLEVBQ3JEO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFBRTtBQUFBLElBQ0EsV0FBVyxRQUFRLElBQUksWUFBWTtBQUFBLElBQ25DLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLFVBQVVELFNBQVEsVUFBVSxZQUFZLFlBQVk7QUFBQSxRQUNwRCxPQUFPQSxTQUFRLFVBQVUsU0FBUyxZQUFZO0FBQUEsUUFDOUMsU0FBU0EsU0FBUSxVQUFVLFdBQVcsVUFBVTtBQUFBLFFBQ2hELFlBQVlBLFNBQVEsVUFBVSxjQUFjLFVBQVU7QUFBQSxRQUN0RCxPQUFPQSxTQUFRLFVBQVUsU0FBUyxZQUFZO0FBQUEsUUFDOUMsUUFBUUEsU0FBUSxVQUFVLFVBQVUsWUFBWTtBQUFBLFFBQ2hELFNBQVNBLFNBQVEsVUFBVSxXQUFXLFlBQVk7QUFBQSxNQUNwRDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCLENBQUMsVUFBVSxhQUFhLE1BQU07QUFBQSxNQUNoRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicmVzb2x2ZSIsICJmcyIsICJwYXRoIiwgInJlc29sdmUiLCAicGF0aCIsICJvdXREaXIiLCAicm9vdCIsICJyZXNvbHZlIiwgIm91dERpciJdCn0K
