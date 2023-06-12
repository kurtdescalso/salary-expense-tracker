interface IExpenseEntry {
  id?: number;
  amount: number;
  description: string;
  category: string;
  accounting_date: string;
  created_at: string;
  salary_id: number;
}

interface ISalaryRecord {
  id?: number;
  amount: number;
  description: string;
  expenses?: IExpenseEntry[];
  accounting_date: string;
  created_at?: Date | string;
}

export type {ISalaryRecord, IExpenseEntry};
