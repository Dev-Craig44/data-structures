import * as fs from "fs";
import path from "path";
import stripJsonComments from "strip-json-comments";

const configFile = path.join(process.cwd(), "tsconfig.json");
const raw = fs.readFileSync(configFile, "utf-8");
const cleanedFile = JSON.parse(stripJsonComments(raw));

function main() {
  fs.writeFileSync(configFile, JSON.stringify(cleanedFile), "utf-8");
  console.log(cleanedFile);
}

main();
