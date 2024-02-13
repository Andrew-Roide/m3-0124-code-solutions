import { readFile, writeFile } from 'node:fs/promises';

type Data = {
  nextId: number;
  notes: Record<string, string>;
};

const dataFilePath = 'data.json';

async function readData(): Promise<Data> {
  const rawData = await readFile(dataFilePath, 'utf8');
  return JSON.parse(rawData) as Data;
}

async function writeData(data: Data): Promise<void> {
  try {
    await writeFile('data.json', JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error writing data: ${error}`);
  }
}

async function readNotes(): Promise<void> {
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

async function addNote(content: string): Promise<void> {
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

async function deleteNote(id: string): Promise<void> {
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

async function updateNote(id: string, content: string): Promise<void> {
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

const [, , action, arg1, arg2] = process.argv;

if (action === 'read') {
  await readNotes();
} else if (action === 'create') {
  await addNote(arg1);
} else if (action === 'update') {
  await updateNote(arg1, arg2);
} else if (action === 'delete') {
  await deleteNote(arg1);
}
