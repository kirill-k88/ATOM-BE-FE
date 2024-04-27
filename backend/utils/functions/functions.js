module.exports.parseDate = sDate => {
  const [day, month, year] = sDate.split('.').map(Number);

  const parsedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

  return parsedDate;
};
