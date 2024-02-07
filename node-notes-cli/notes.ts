import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';


type Data = {
  nextId: number;
  notes: Record<string, string>;
};

const dataFilePath = 'data.json';

async function readData() {
  try {
    const rawData = await readFile(dataFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    throw new Error(`Error reading data: ${error}`);
  }
}

async function writeData(data: Data) {
  try {
    await writeFile('data.json', JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error writing data: ${error}`);
  }
}

async function readNotes() {
  try {
    const data = await readData();
    const notes = data.notes;

    for (const id in notes) {
      console.log(`ID: ${id}, Content: ${notes[id]}`);
    }
  } catch (error) {
    console.error('Error reading notes:', error);
  }
}

async function addNote(content: string) {
  try {
    const data = await readData();
    const newId = data.nextId.toString();

    data.notes[newId] = content;
    data.nextId++;

    await writeData(data);

    console.log(`Note added with ID: ${newId}`);
  } catch (error) {
    console.error('Error adding note:', error);
  }
}

async function deleteNote(id: string) {
  try {
    const data = await readData();

    if (data.notes[id]) {
      delete data.notes[id];
      await writeData(data);
      console.log(`Note with ID ${id} deleted successfully.`);
    } else {
      console.log(`Note with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

async function updateNote(id: string, content: string) {
  try {
    const data = await readData();

    if (data.notes[id]) {
      data.notes[id] = content;
      await writeData(data);
      console.log(`Note with ID ${id} updated successfully.`);
    } else {
      console.log(`Note with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error updating note:', error);
  }
}

const action = process.argv[2];

if (action === 'read') {
  await readNotes();
} else if (action === 'create') {
  await addNote(process.argv[3]);
} else if (action === 'update') {
  await updateNote(process.argv[3], process.argv[4]);
} else if (action === 'delete') {
  await deleteNote(process.argv[3]);
}
