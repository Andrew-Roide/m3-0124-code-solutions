import { writeFile } from 'node:fs/promises';

try {
  const filePath = 'note.txt';
  const data = process.argv[2];
  await writeFile(filePath, data);
  console.log(filePath);
} catch (error) {
  console.log('Error writing file', error);
}
