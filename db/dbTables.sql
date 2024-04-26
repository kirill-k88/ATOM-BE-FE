create TABLE works(
  id SERIAL PRIMARY KEY,
  object VARCHAR(255),
  works VARCHAR(255),
  date DATE, 
  plan_sum NUMERIC, 
  plan_fact NUMERIC
);