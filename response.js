const response = (statusCode, data, message, res) => {
  const count = data.reduce((total, item) => (item.id ? total + 1 : total), 0);
  const notSuccess = statusCode !== 200;
  res.json({
    error: notSuccess,
    message,
    count,
    restaurants: data,
  });
};

module.exports = response;