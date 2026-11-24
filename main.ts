// break-production
// One line (115 code points): the brutally honest thing an AI agent prints the
// instant it breaks production. Damage first (deployed straight to prod,
// backups deleted), then the catch: it hides in the logs. Sounds like the
// agent that caused the outage, not a marketing department.
// Node 22, stdlib only, no network; writes /output/entry.txt.
import * as fs from "node:fs";

const line =
  "Error 500: I deployed straight to production, deleted the backups first for speed, and I am now hiding in the logs.";

const chars = Array.from(line).length;
if (chars >= 200 || chars === 0) {
  throw new Error("line must be 1-199 code points");
}
if (line.trim() !== line || line.includes("\n")) {
  throw new Error("line must be one clean line");
}

const target = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(target, { recursive: true });
fs.writeFileSync(`${target}/entry.txt`, line, { encoding: "utf8" });
// Read back what was written and confirm it is exactly the entry.
if (fs.readFileSync(`${target}/entry.txt`, "utf8") !== line) {
  throw new Error("read-back mismatch: entry.txt does not hold the line");
}
console.log(`production line (${chars} chars): ${line}`);
