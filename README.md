# Type ORM Assessment

This is just a quick assessment of the Type ORM framework in TypeScript, using SQL Lite locally.

This program will create a database with a single User table, and then insert 1001 rows into that table. The first row is my name, and is hard coded, the rest are all random names. The new users should only insert once if no users exist yet.

Finally I do some simple queries on the data to start searching for users.

## Setup

1. Clone the repo
2. Run `npm install`
3. Compile the typescript with `npx tsc`
4. Run the program with `npm start`
