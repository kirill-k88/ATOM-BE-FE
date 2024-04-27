create TABLE works(
  id SERIAL PRIMARY KEY,
  object_name TEXT,
  work_type TEXT,
  work_date TIMESTAMP, 
  plan_sum NUMERIC, 
  plan_fact NUMERIC
);