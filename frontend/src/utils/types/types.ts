export type TGroup = {
  object_name: string;
  work_type: string;
  work_year: number;
  work_month: number;
  total_plan_sum: number;
  total_fact_sum: number;
};

export type TWork = {
  id: number;
  object_name: string;
  work_type: string;
  work_date: string;
  plan_sum: number;
  fact_sum: number;
};
