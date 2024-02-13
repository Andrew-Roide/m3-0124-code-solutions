import express from 'express';

type Grade = {
  id: number;
  name: string;
  course: string;
  score: number;
};

const app = express();

let nextId = 1;
const grades: Record<number, Grade> = {};

app.get('/api/grades', (req, res) => {
  res.json(Object.values(grades));
});

app.use(express.json());

app.post('/api/grades', (req, res) => {
  const { name, course, score } = req.body;
  const newGrade = {
    id: nextId++,
    name,
    course,
    score,
  };

  grades[newGrade.id] = newGrade;
  res.status(201).json(newGrade);
});

app.listen(8080, () => {
  console.log('Express server listening on port 8080');
});
