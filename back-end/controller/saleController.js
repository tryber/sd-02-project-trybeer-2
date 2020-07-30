const rescue = require('express-rescue');
const saleService = require('../service/saleService');
const schemasJoi = require('./schemasJoi');
const { validateJoi } = require('./schemasJoi');

const createSale = rescue(async (req, res, next) => {
  const isValid = await validateJoi(schemasJoi.createSale, req.body);
  if (isValid.error) return next(isValid);
  const { ...sale } = req.body;
  const { id: userId } = req.user;
  const serviceAnswer = await saleService.createSale(sale, userId);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(201).json(serviceAnswer);
});

module.exports = {
  createSale,
};
