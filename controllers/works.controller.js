class WorksController {
  async uploadWorks(req, res) {
    const list = req.body;
    console.log(list);
    res.send('loaded');
  }

  async getWorks(req, res) {
    res.send('hello!');
  }
}

module.exports = new WorksController();
