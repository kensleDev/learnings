import fs from "fs";

interface IFileReader {
  isJsonFile(file: string): boolean;
  readText(file: string): string;
  readJson(file: string): unknown;
}

abstract class DirectoryScrapper {
  constructor(public dirPath: string) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (this.isJsonFile(file)) {
            acc[file] = this.readJson(`${this.dirPath}/${file}`);
          } else {
            acc[file] = this.readText(`${this.dirPath}/${file}`);
          }
          return acc;
        },
        {}
      );
  }

  abstract isJsonFile(file: string): boolean;
  abstract readText(file: string): string;
  abstract readJson(file: string): unknown;
}

class FileReader extends DirectoryScrapper {
  isJsonFile(file: string): boolean {
    return file.endsWith(".json");
  }

  readText(file: string): string {
    return fs.readFileSync(file, "utf-8").toString();
  }

  readJson(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, "utf-8").toString());
  }
}

const directoryScrapper = new FileReader("./data");
const output = directoryScrapper.scanFiles();
console.log({ output });
