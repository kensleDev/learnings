import fs from "fs";

interface IFileReader {
  isJsonFile(file: string): boolean;
  readText(file: string): string;
  readJson(file: string): unknown;
}

class DirectoryScrapper {
  constructor(public dirPath: string, public fileReader: IFileReader) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (this.fileReader.isJsonFile(file)) {
            acc[file] = this.fileReader.readJson(`${this.dirPath}/${file}`);
          } else {
            acc[file] = this.fileReader.readText(`${this.dirPath}/${file}`);
          }
          return acc;
        },
        {}
      );
  }
}

class FileReader implements IFileReader {
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

const fileReader = new FileReader();
const directoryScrapper = new DirectoryScrapper("./data", fileReader);

const output = directoryScrapper.scanFiles();
console.log({ output });
