import fse from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcDirs = ["icons", "plugins", "skins", "themes", "tinymce.min.js"];
const tinymceSrc = path.join(__dirname, "node_modules", "tinymce");
const publicDest = path.join(__dirname, "public", "tinymce");

try {
  fse.ensureDirSync(publicDest);

  for (const dir of srcDirs) {
    const from = path.join(tinymceSrc, dir);
    const to = path.join(publicDest, dir);
    if (fse.existsSync(from)) {
      fse.copySync(from, to, { overwrite: true });
    }
  }

  console.log("✅ TinyMCE assets copied successfully.");
} catch (err) {
  console.error("❌ Failed to copy TinyMCE assets:", err);
  process.exit(1);
}
