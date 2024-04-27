const { pool } = require('../db/db');
const { parseDate } = require('../utils/functions/functions');
const { DB_INSERT_ERROR, DB_SELECT_ERROR } = require('../utils/constants/db_connection');

class WorksController {
  async uploadWorks(req, res) {
    const list = req.body;
    const workList = [];

    try {
      for (const w of list) {
        const date = parseDate(w.date);
        console.log(date);
        const result = await pool.query(
          `INSERT INTO works (object_name, work_type, work_date, plan_sum, fact_sum) values ($1, $2, $3::timestamp, $4, $5) RETURNING *`,
          [w.object, w.works, date, w.planSum, w.planFact]
        );
        workList.push(result.rows[0]);
      }

      res.send(workList);
    } catch (err) {
      res.send(DB_INSERT_ERROR);
      console.log(err);
    }
  }

  async getWorks(req, res) {
    const period_start = req.query.period_start;
    const period_end = req.query.period_end;
    const object_name = req.query.object_name;
    const work_type = req.query.work_type;
    const withSummary = req.query.with_summary;

    try {
      const result = await pool.query(
        `SELECT * FROM ${
          withSummary ? 'get_grouped_data' : 'get_filtred_data'
        }($1::timestamp, $2::timestamp, $3, $4)`,
        [
          period_start && parseDate(period_start),
          period_end && parseDate(period_end),
          object_name,
          work_type
        ]
      );
      res.send(result.rows);
    } catch (err) {
      res.send(DB_SELECT_ERROR);
      console.log(err);
    }
  }
}

module.exports = new WorksController();
