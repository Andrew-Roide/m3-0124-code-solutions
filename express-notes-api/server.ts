import { readFile, writeFile } from 'node:fs/promises';
import express from 'express';

type Note = {
  id: number;
  content: string;
};
type Data = {
  nextId: number;
  notes: Record<string, Note>;
};

const app = express();
app.use(express.json());

async function readData(): Promise<Data> {
  const data = await readFile('./data.json');
  return JSON.parse(data.toString());
}

async function writeData(data: Data): Promise<void> {
  await writeFile('./data.json', JSON.stringify(data, null, 2));
}

app.get('/api/notes', async (req, res) => {
  try {
    const data = await readData();
    const notes: Note[] = [];
    for (const id in data.notes) {
      notes.push(data.notes[id]);
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.get('/api/notes/:id', async (req, res) => {
  try {
    const data = await readData();
    const id = Number(req.params.id);
    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'id must be a positive integer' });
    }
    if (data.notes[id] === undefined) {
      res.status(404).json({ error: `cannot find note with id ${id}` });
    }
    res.status(200).json(data.notes[id]);
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { content } = req.body;
    if (content === undefined) {
      res.status(400).json({ error: 'content is a required field' });
    }
    const data = await readData();

    const note = {
      id: data.nextId,
      content,
    };

    data.notes[note.id] = note;
    data.nextId++;

    try {
      await writeData(data);
      res.status(201).json(note);
    } catch (writeError) {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'id must be a positive integer' });
    }
    const data = await readData();
    if (data.notes[id] === undefined) {
      res.status(404).json({ error: `cannot find note with id ${id}` });
    }
    try {
      delete data.notes[id];
      await writeData(data);
      res.sendStatus(204);
    } catch (writeError) {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.put('/api/notes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'id must be a positive integer' });
    }
    const { content } = req.body;
    if (content === undefined) {
      res.status(400).json({ error: 'content is a required field' });
    }
    const data = await readData();
    if (data.notes[id] === undefined) {
      res.status(404).json({ error: `cannot find note with id ${id}` });
    }

    const note = {
      id,
      content,
    };
    data.notes[note.id] = note;
    await writeData(data);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.use(express);

app.listen(8080, () => {
  console.log(`express server listening on port 8080`);
});
