import { writeFile } from 'node:fs/promises';

async function randomNumber() {
  try {
    const filePath = 'randomNum.txt';
    const data = Math.floor(Math.random() * 11);
    await writeFile(filePath, data.toString());
    console.log(filePath);

  } catch (error) {
    console.log('Error writing file', error);
  }
}

randomNumber();
