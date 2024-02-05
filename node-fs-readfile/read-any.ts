import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path';

async function logAnyFile() {
  try {
    const filePath = resolve(process.argv[2]);
    const contents: string = await readFile(filePath, { encoding: 'utf-8' });
    console.log(contents);
  } catch (error) {
    console.error(`Error reading: ${error}`);
  }
}

logAnyFile();
