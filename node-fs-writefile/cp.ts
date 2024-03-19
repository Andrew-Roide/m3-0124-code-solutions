import { readFile, writeFile } from 'node:fs/promises';

try {
  const sourceFilePath = process.argv[2];
  const destinationFilePath = process.argv[3];
  const data = await readFile(sourceFilePath);
  await writeFile(destinationFilePath, data);
} catch (error) {
  console.log('Error copying file', error);
}
