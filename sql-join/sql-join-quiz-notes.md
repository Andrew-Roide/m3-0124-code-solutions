# sql-join-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is a foreign key?
  a field in a database table that is used to establish a link between two tables

- How do you join two SQL tables? (Provide at least two syntaxes.)
  the join clause with on and the where clause

- How do you temporarily rename columns or tables in a SQL statement?
  with column aliases. "from xyz AS abc"

- How do you create a one-to-many relationship between two tables?
  with a foreign key in one table pointing to a primary key in another table

- How do you create a many-to-many relationship between two tables?
  by introducing a 3rd "join table" that contains a foreign key to one of the tables and another foreign key to the other table

+-------------+ +------------------+
| Table A | | Table B |
+-------------+ +------------------+
| Primary Key | | Primary Key |
| ... | | ... |
| Foreign Key |---(1:N)--►| ... |
+-------------+ +------------------+
The "Table A" has a primary key, and "Table B" has a primary key.
The relationship is represented by a line connecting the primary key of "Table A" to a foreign key in "Table B."
The (1:N) indicates the one-to-many relationship.

+-------------+ +------------------+
| Table A | | Table B |
+-------------+ +------------------+
| Primary Key | | Primary Key |
| ... | | ... |
+-------------+ +------------------+
| |
▼ ▼
+--------------------------------------------+
| Junction Table |
+--------------------------------------------+
| Foreign Key (A) | Foreign Key (B) |
| ... | ... |
+------------------------+-------------------+
"Table A" and "Table B" each have their primary key.
The many-to-many relationship is resolved using a junction table that contains foreign keys pointing to the primary keys of both "Table A" and "Table B."
