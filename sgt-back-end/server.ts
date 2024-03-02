import pg from 'pg';
import express from 'express';
import { ClientError } from './client-error';
/*
Without Connection Pool: New connections are created (client.connect()) and closed (client.end()) for each request. Effectively stopping the database connection
With Connection Pool: Connections are borrowed from the pool (const client = await pool.connect()) and released back (client.release()), allowing them to be reused for multiple requests without stopping the database connection.
***The db.query() method, when used with a connection pool, automatically acquires a connection from the pool, executes the query, and releases the connection back to the pool.***
*/

const app = express();
// mount the express.json() middleware to parse JSON request bodies.
app.use(express.json());

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get('/api/grades', async (req, res, next) => {
  try {
    const sql = `
    select *
      from "grades"
    `;

    const result = await db.query(sql);
    const grades = result.rows; // returns ALL objects when no index is defined
    res.status(200).json(grades);
  } catch (err) {
    next(err);
    res.status(500).send('Error executing database operation');
  }
});

app.post('/api/grades', async (req, res, next) => {
  try {
    const sql = `
    insert into "grades" ("name", "course", "score")
      values ($1, $2, $3)
      returning *
    `;
    // validate the inputs first before creating the params array.
    const { name, course, score } = req.body;
    if (
      !name ||
      !course ||
      !Number.isInteger(score) ||
      score < 0 ||
      score > 100
    ) {
      throw new ClientError(
        400,
        'Invalid input. Please provide a valid name, course, and score between 0 and 100.'
      );
    }
    const params = [name, course, score];
    const result = await db.query(sql, params);
    const grade = result.rows[0]; // returns a single object when index is defined

    res.status(201).json(grade);
  } catch (err) {
    next(err);
    res.status(500).send('Error executing database operation');
  }
});

app.put('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const sql = `
    update "grades"
      set "name" = $1, "course" = $2, "score" = $3
      where "gradeId" = $4
      returning *
    `;
    // validate the inputs first before creating the params array.
    const { name, course, score } = req.body;
    const gradeId = Number(req.params.gradeId);
    if (
      !name ||
      !course ||
      !Number.isInteger(score) ||
      score < 0 ||
      score > 100
    ) {
      throw new ClientError(
        400,
        'Invalid input. Please provide a valid name, course, and score between 0 and 100.'
      );
    }

    const params = [name, course, score, gradeId];
    const result = await db.query(sql, params);
    const updatedGrade = result.rows[0];

    if (!updatedGrade) {
      throw new ClientError(404, `Cannot find grade with "gradeId" ${gradeId}`);
    }

    res.status(200).json(updatedGrade);
  } catch (err) {
    next(err);
    res.status(500).send('Error executing database operation');
  }
});

app.delete('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const sql = `
      delete from "grades"
      where "gradeId" = $1
      returning *
    `;
    // validate the inputs first before creating the params array.
    const gradeId = Number(req.params.gradeId);
    if (!gradeId) {
      throw new ClientError(400, 'Invalid gradeId provided');
    }

    const params = [gradeId];
    const result = await db.query(sql, params);
    const deletedGrade = result.rows[0];

    if (!deletedGrade) {
      throw new ClientError(404, `Cannot find grade with "gradeId" ${gradeId}`);
    }

    res.status(204).json(deletedGrade);
  } catch (err) {
    next(err);
    res.status(500).send('Error executing database operation');
  }
});

app.listen(8080, () => {
  console.log('Express server listening on port 8080');
});
