CREATE OR REPLACE FUNCTION get_grouped_data(
    IN period_start DATE,
    IN period_end DATE,
    IN object_name TEXT,
    IN work_type TEXT
)
RETURNS TABLE (
    object TEXT,
    works TEXT,
    date DATE
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        object,
        works,
        date
    FROM
        works
    WHERE
        date >= period_start
        AND date <= period_end
        AND object = object_name
        AND works = work_type
    GROUP BY
        date_column;
END;
$$ LANGUAGE plpgsql;
