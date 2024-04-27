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
        const result = await pool.query(
          'INSERT INTO works (object, works, date, plan_sum, plan_fact) values ($1, $2, $3, $4, $5) RETURNING *',
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

  async getAllWorks(req, res) {
    try {
      const result = await pool.query('SELECT * FROM works');
      res.send(result.rows);
    } catch (err) {
      res.send(DB_SELECT_ERROR);
      console.log(err);
    }
  }
}

module.exports = new WorksController();
