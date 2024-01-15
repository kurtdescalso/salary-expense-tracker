import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

export const SALARIES_TABLE = 'salaries';
export const EXPENSES_TABLE = 'expenses';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({
    name: 'salary_expenses.db',
    location: 'default',
  });
};

export const createTables = async (db: SQLiteDatabase) => {
  const createSalariesTableQuery = `CREATE TABLE IF NOT EXISTS ${SALARIES_TABLE} (
    id INTEGER NOT NULL PRIMARY KEY,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    accounting_date TEXT NOT NULL DEFAULT current_timestamp,
    created_at TEXT NOT NULL
  )`;

  try {
    await db.executeSql(createSalariesTableQuery);
  } catch (err) {
    console.log("error creating 'SALARIES' table:");
    console.log(err);
  }

  const createExpensesTableQuery = `CREATE TABLE IF NOT EXISTS ${EXPENSES_TABLE} (
    id INTEGER NOT NULL PRIMARY KEY,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    accounting_date TEXT NOT NULL DEFAULT current_timestamp,
    created_at TEXT NOT NULL,
    salary_id INTEGER NOT NULL,
    FOREIGN KEY (salary_id) REFERENCES ${SALARIES_TABLE}(id)
    ON DELETE CASCADE
  )`;

  try {
    await db.executeSql(createExpensesTableQuery);
  } catch (err) {
    console.log("error creating 'EXPENSES' table:");
    console.log(err);
  }
};

export const setupSQLite = async (db: SQLiteDatabase) => {
  try {
    await db.executeSql(`PRAGMA foreign_keys = ON`);
  } catch (err) {
    console.log('error setting up SQLite');
    console.log(err);
  }
};
