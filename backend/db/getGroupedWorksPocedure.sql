CREATE OR REPLACE FUNCTION get_grouped_data(
    IN period_start_in TIMESTAMP DEFAULT NULL,
    IN period_end_in TIMESTAMP DEFAULT NULL,
    IN object_name_in TEXT DEFAULT NULL,
    IN work_type_in TEXT DEFAULT NULL,
    IN group_by_year BOOLEAN DEFAULT TRUE
)
RETURNS TABLE (
    object_name TEXT,
    work_type TEXT,
    work_year INT,
    work_month INT,
    total_plan_sum NUMERIC,
    total_fact_sum NUMERIC,
    cumulative_plan_sum NUMERIC,
    cumulative_fact_sum NUMERIC
)
AS $$
BEGIN
    RETURN QUERY
    WITH monthly_data AS (
        SELECT
            COALESCE(NULLIF(object_name_in, ''), 'Все объекты') AS object_name,
            COALESCE(NULLIF(work_type_in, ''), 'Все виды работ') AS work_type,
            CAST(EXTRACT(YEAR FROM w.work_date) AS INT) AS work_year,
            CAST(EXTRACT(MONTH FROM w.work_date) AS INT) AS work_month,
            SUM(w.plan_sum) AS total_plan_sum,
            SUM(w.fact_sum) AS total_fact_sum
        FROM
            works w
        WHERE
            (period_start_in IS NULL OR w.work_date >= period_start_in)
            AND (period_end_in IS NULL OR w.work_date <= period_end_in)
            AND (object_name_in IS NULL OR w.object_name LIKE '%' || object_name_in || '%')
            AND (work_type_in IS NULL OR w.work_type LIKE '%' || work_type_in || '%')
        GROUP BY
            COALESCE(NULLIF(object_name_in, ''), 'Все объекты'),
            COALESCE(NULLIF(work_type_in, ''), 'Все виды работ'),
            CAST(EXTRACT(YEAR FROM w.work_date) AS INT),
            CAST(EXTRACT(MONTH FROM w.work_date) AS INT)
        ORDER BY
            work_year, work_month
    )
    SELECT
        monthly_data.object_name,
        monthly_data.work_type,
        monthly_data.work_year,
        monthly_data.work_month,
        monthly_data.total_plan_sum,
        monthly_data.total_fact_sum,
        SUM(monthly_data.total_plan_sum) OVER (PARTITION BY monthly_data.object_name, monthly_data.work_type ORDER BY monthly_data.work_year, monthly_data.work_month) AS cumulative_plan_sum,
        SUM(monthly_data.total_fact_sum) OVER (PARTITION BY monthly_data.object_name, monthly_data.work_type ORDER BY monthly_data.work_year, monthly_data.work_month) AS cumulative_fact_sum
    FROM
        monthly_data;
END;
$$ LANGUAGE plpgsql;
