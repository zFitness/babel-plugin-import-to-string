import * as path from "path";
import * as fs from "fs";
import diffPrint from "diff-print";
import { transformFileSync } from "@babel/core";

describe("", () => {
  const fixturesDir = path.join(__dirname, "fixtures");
  fs.readdirSync(fixturesDir).map((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName);
    if (!fs.statSync(fixtureDir).isDirectory()) return;

    it(`should ${caseName.split("-").join(" ")}`, () => {
      const actualPath = path.join(fixtureDir, "actual.ts");
      const actual = transformFileSync(actualPath).code;
      const expected = fs
        .readFileSync(path.join(fixtureDir, "expected.ts"))
        .toString();
      fs.writeFileSync(path.join(fixtureDir, "transformFile.ts"), actual);
      const result = diffPrint(actual, expected);
      expect(result).toBe(true);
    });
  });
});
