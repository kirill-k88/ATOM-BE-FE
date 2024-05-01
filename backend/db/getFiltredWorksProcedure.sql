CREATE OR REPLACE FUNCTION get_filtred_data(
    IN period_start_in TIMESTAMP DEFAULT NULL,
    IN period_end_in TIMESTAMP DEFAULT NULL,
    IN object_name_in TEXT DEFAULT NULL,
    IN work_type_in TEXT DEFAULT NULL
)
RETURNS TABLE (
    object_name TEXT,
    work_type TEXT,
    work_date TIMESTAMP,
    plan_sum NUMERIC,
    fact_sum NUMERIC
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        w.object_name,
        w.work_type,
        w.work_date,
        w.plan_sum,
        w.fact_sum
    FROM
        works w
    WHERE
        (period_start_in IS NULL OR w.work_date >= period_start_in)
        AND (period_end_in IS NULL OR w.work_date <= period_end_in)
        AND (object_name_in IS NULL OR w.object_name LIKE '%' || object_name_in || '%')
        AND (work_type_in IS NULL OR w.work_type LIKE '%' || work_type_in || '%')
    ORDER BY
        w.work_date;
END;
$$ LANGUAGE plpgsql;