import {create} from 'zustand';
import {ISalaryRecord, IExpenseEntry} from '../schemas/salaries';

interface ISalaryRecordStore {
  salaryRecords: ISalaryRecord[];
  pinnedSalaryRecords: ISalaryRecord[];
  expenseRecords: IExpenseEntry[];
  allExpenseRecords: IExpenseEntry[];
  selectedSalaryRecord: ISalaryRecord;
  setSalaryRecords: (records: ISalaryRecord[]) => void;
  setPinnedSalaryRecords: (records: ISalaryRecord[]) => void;
  setExpenseRecords: (records: IExpenseEntry[]) => void;
  setAllExpenseRecords: (records: IExpenseEntry[]) => void;
  setSelectedSalaryRecord: (records: ISalaryRecord) => void;
}

const SELECTED_SALARY_RECORD_INITIAL_VALUE = {
  id: -1,
  amount: 0,
  description: '',
  expenses: [],
  accounting_date: '',
  created_at: '',
};

const useSalaryRecordStore = create<ISalaryRecordStore>(set => ({
  salaryRecords: [],
  pinnedSalaryRecords: [],
  expenseRecords: [],
  allExpenseRecords: [],
  selectedSalaryRecord: SELECTED_SALARY_RECORD_INITIAL_VALUE,
  setSalaryRecords: (records: ISalaryRecord[]) => {
    set({salaryRecords: records});
  },
  setPinnedSalaryRecords: (record: ISalaryRecord[]) => {
    set({pinnedSalaryRecords: record});
  },
  setExpenseRecords: (records: IExpenseEntry[]) => {
    set({expenseRecords: records});
  },
  setAllExpenseRecords: (records: IExpenseEntry[]) => {
    set({allExpenseRecords: records});
  },
  setSelectedSalaryRecord: (record: ISalaryRecord) => {
    set({selectedSalaryRecord: record});
  },
}));

export default useSalaryRecordStore;
