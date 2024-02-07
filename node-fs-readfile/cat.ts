import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function logCatFile() {
  try {
    const filePaths = process.argv.slice(2).map((arg) => resolve(arg));
    const fileContentsPromises = filePaths.map((filePath) =>
      readFile(filePath, 'utf-8')
    );
    const fileContents = await Promise.all(fileContentsPromises);

    console.log(fileContents.join(''));
  } catch (error) {
    console.error(`Error reading or concatenating files: ${error}`);
  }
}

logCatFile();
