import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {EXPENSES_TABLE} from './database';
import {IExpenseEntry} from '../schemas/salaries';

export const getTotalExpenses = async (db: SQLiteDatabase) => {
  const query = `SELECT SUM(${EXPENSES_TABLE}.amount) AS total_expenses FROM ${EXPENSES_TABLE}`;
  return await db.executeSql(query);
};

export const getAllExpenses = async (db: SQLiteDatabase) => {
  const query = `SELECT * FROM ${EXPENSES_TABLE}`;

  return await db.executeSql(query);
};

export const getExpensesBySalaryRecordId = async (
  db: SQLiteDatabase,
  salaryId: number,
) => {
  const query = `SELECT * FROM ${EXPENSES_TABLE} WHERE salary_id=${salaryId}`;

  return await db.executeSql(query);
};

export const addExpenseRecord = async (
  db: SQLiteDatabase,
  expense: IExpenseEntry,
) => {
  const query = `INSERT INTO ${EXPENSES_TABLE} (
    amount,
    description,
    category,
    accounting_date,
    salary_id,
    created_at
  ) VALUES (
    ?, ?, ?,
    ?, ?, ?
  )`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [
      expense.amount,
      expense.description,
      expense.category,
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
  const query = `UPDATE ${EXPENSES_TABLE} SET
    amount=?,
    description=?,
    category=?,
    accounting_date=?
  WHERE id=?`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [
      expense.amount,
      expense.description,
      expense.category,
      expense.accounting_date,
      expense.id,
    ]);
  });
};

export const deleteExpenseRecord = async (
  db: SQLiteDatabase,
  expense: IExpenseEntry,
) => {
  const query = `DELETE FROM ${EXPENSES_TABLE}
    WHERE id=?`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [expense.id]);
  });
  await db.executeSql(query);
};
