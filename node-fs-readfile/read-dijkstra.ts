import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function logFile() {
  try {
    const filePath = resolve('dijkstra.txt');
    const contents: string = await readFile(filePath, { encoding: 'utf-8'});
    console.log(contents);
  } catch (error) {
    console.error('Error reading dijkstra.txt', error);
  }
}

logFile();
