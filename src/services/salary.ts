import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {SALARIES_TABLE_NAME} from './database';
import {ISalaryRecord} from '../schemas/salaries';

export const getSalaryRecords = async (db: SQLiteDatabase) => {
  const query = `SELECT * FROM ${SALARIES_TABLE_NAME}`;
  return await db.executeSql(query);
};

export const getTotalSalaries = async (db: SQLiteDatabase) => {
  const query = `SELECT SUM(${SALARIES_TABLE_NAME}.amount) AS total_salaries FROM ${SALARIES_TABLE_NAME}`;
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
