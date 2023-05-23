import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {ISalaryRecord, IExpenseEntry} from '../schemas/salaries';

const SALARIES_TABLE_NAME = 'salaries';
const EXPENSES_TABLE_NAME = 'expenses';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({
    name: 'salary_expenses.db',
    location: 'default',
  });
};

export const createTables = async (db: SQLiteDatabase) => {
  const createSalariesTableQuery = `CREATE TABLE IF NOT EXISTS ${SALARIES_TABLE_NAME} (
    id INTEGER NOT NULL PRIMARY KEY,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    accounting_date TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`;

  try {
    await db.executeSql(createSalariesTableQuery);
  } catch (err) {
    console.log("error creating 'SALARIES' table:");
    console.log(err);
  }

  const createExpensesTableQuery = `CREATE TABLE IF NOT EXISTS ${EXPENSES_TABLE_NAME} (
    id INTEGER NOT NULL PRIMARY KEY,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    accounting_date TEXT NOT NULL,
    created_at TEXT NOT NULL,
    salary_id INTEGER NOT NULL
  )`;

  try {
    await db.executeSql(createExpensesTableQuery);
  } catch (err) {
    console.log("error creating 'EXPENSES' table:");
    console.log(err);
  }
};

export const getSalaryRecords = async (db: SQLiteDatabase) => {
  const query = `SELECT * FROM ${SALARIES_TABLE_NAME}`;
  return await db.executeSql(query);
};

export const getTotalSalaries = async (db: SQLiteDatabase) => {
  const query = `SELECT SUM(${SALARIES_TABLE_NAME}.amount) AS total_salaries FROM ${SALARIES_TABLE_NAME}`;
  return await db.executeSql(query);
};

export const getTotalExpenses = async (db: SQLiteDatabase) => {
  const query = `SELECT SUM(${EXPENSES_TABLE_NAME}.amount) AS total_expenses FROM ${EXPENSES_TABLE_NAME}`;
  return await db.executeSql(query);
};

export const getSalaryRecordById = async (
  db: SQLiteDatabase,
  salaryId: number,
) => {
  const query = `SELECT * FROM ${SALARIES_TABLE_NAME} WHERE id=${salaryId} LIMIT 1`;

  return await db.executeSql(query);
};

export const addSalaryRecord = async (
  db: SQLiteDatabase,
  salary: ISalaryRecord,
) => {
  const query = `INSERT INTO ${SALARIES_TABLE_NAME} (
    amount,
    description,
    accounting_date,
    created_at
  ) VALUES (
    ?, ?, ?, ?
  )`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [
      salary.amount,
      salary.description,
      salary.accounting_date,
      salary.created_at,
    ]);
  });
};

export const editSalaryRecord = async (
  db: SQLiteDatabase,
  salary: ISalaryRecord,
) => {
  const query = `UPDATE ${SALARIES_TABLE_NAME} SET
    amount=?,
    description=?,
    accounting_date=?,
    created_at=?
  WHERE id=?`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [
      salary.amount,
      salary.description,
      salary.accounting_date,
      salary.created_at,
      salary.id,
    ]);
  });
};

export const deleteSalaryRecord = async (
  db: SQLiteDatabase,
  salary: ISalaryRecord,
) => {
  const query = `DELETE FROM ${SALARIES_TABLE_NAME}
    WHERE id=?`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [salary.id]);
  });
};

export const getExpensesBySalaryRecordId = async (
  db: SQLiteDatabase,
  salaryId: number,
) => {
  const query = `SELECT * FROM ${EXPENSES_TABLE_NAME} WHERE salary_id=${salaryId}`;

  return await db.executeSql(query);
};

export const addExpenseRecord = async (
  db: SQLiteDatabase,
  expense: IExpenseEntry,
) => {
  const query = `INSERT INTO ${EXPENSES_TABLE_NAME} (
    amount,
    description,
    accounting_date,
    salary_id,
    created_at
  ) VALUES (
    ?, ?, ?,
    ?, ?
  )`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [
      expense.amount,
      expense.description,
      expense.accounting_date,
      expense.salary_id,
      expense.created_at,
    ]);
  });
};

export const editExpenseRecord = async (
  db: SQLiteDatabase,
  expense: IExpenseEntry,
) => {
  const query = `UPDATE ${EXPENSES_TABLE_NAME} SET
    amount=?,
    description=?,
    accounting_date=?
  WHERE id=?`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [
      expense.amount,
      expense.description,
      expense.accounting_date,
      expense.salary_id,
    ]);
  });
};

export const deleteExpenseRecord = async (
  db: SQLiteDatabase,
  expense: IExpenseEntry,
) => {
  const query = `DELETE FROM ${EXPENSES_TABLE_NAME}
    WHERE id=?`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [expense.id]);
  });
  await db.executeSql(query);
};
