import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {EXPENSES_TABLE_NAME} from './database';
import {IExpenseEntry} from '../schemas/salaries';

export const getTotalExpenses = async (db: SQLiteDatabase) => {
  const query = `SELECT SUM(${EXPENSES_TABLE_NAME}.amount) AS total_expenses FROM ${EXPENSES_TABLE_NAME}`;
  return await db.executeSql(query);
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
  console.log(expense);
  const query = `UPDATE ${EXPENSES_TABLE_NAME} SET
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
  const query = `DELETE FROM ${EXPENSES_TABLE_NAME}
    WHERE id=?`;

  await db.transaction(async tx => {
    await tx.executeSql(query, [expense.id]);
  });
  await db.executeSql(query);
};
