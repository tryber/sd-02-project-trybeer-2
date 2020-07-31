const rescue = require('express-rescue');
const saleService = require('../service/saleService');
const schemasJoi = require('./schemasJoi');
const { validateJoi } = require('./schemasJoi');

const createSale = rescue(async (req, res, next) => {
  const isValid = await validateJoi(schemasJoi.createSale, req.body);
  if (isValid.error) return next(isValid);
  const { ...sale } = req.body;
  const { id: userId, name } = req.user;
  const serviceAnswer = await saleService.createSale(sale, userId, name);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(201).json(serviceAnswer);
});

const getSale = rescue(async (req, res, next) => {
  const { id, role } = req.user;
  const serviceAnswer = await saleService.getSale(id, role);
  if (serviceAnswer.error) return next(serviceAnswer);
  return res.status(200).json(serviceAnswer);
});

module.exports = {
  createSale,
  getSale,
};
