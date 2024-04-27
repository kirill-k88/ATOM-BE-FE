const { parse } = require('date-fns');

module.exports.parseDate = sDate => {
  return parse(sDate, 'dd.MM.yyyy', new Date());
};
