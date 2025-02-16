export interface ISearch {
  keyword: string;
  loan?: string;
  age?: string;
  gender?: string;
  interest?: string;
  avg?: string;
  page?: string;
}

export interface SelectedValuesType {
  loan?: string;
  age?: string;
  sex?: string;
  interest?: string;
  avgInterest?: string;
}
