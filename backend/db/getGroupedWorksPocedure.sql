CREATE OR REPLACE FUNCTION get_grouped_data(
    IN period_start_in TIMESTAMP DEFAULT NULL,
    IN period_end_in TIMESTAMP DEFAULT NULL,
    IN object_name_in TEXT DEFAULT NULL,
    IN work_type_in TEXT DEFAULT NULL
)
RETURNS TABLE (
    object_name TEXT,
    work_type TEXT,
    work_year INT,
    work_month INT,
    total_plan_sum NUMERIC,
    total_fact_sum NUMERIC
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        w.object_name,
        w.work_type,
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
        w.object_name,
        w.work_type,
        CAST(EXTRACT(YEAR FROM w.work_date) AS INT),
        CAST(EXTRACT(MONTH FROM w.work_date) AS INT)
    ORDER BY
        work_year, work_month;
END;
$$ LANGUAGE plpgsql;