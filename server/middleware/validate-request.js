const { validationResult, param, query } = require('express-validator');
const { ApiError } = require('./error-handlers');
const { RIOT_API_CONFIG } = require('../config/riot-api');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, 'Invalid request parameters', 'VALIDATION_ERROR');
    }

    next();
  };
};

const validateRegion = param('region')
  .isIn(Object.keys(RIOT_API_CONFIG.regions))
  .withMessage('Invalid region specified');

const validateSummonerName = param('summonerName')
  .trim()
  .notEmpty()
  .withMessage('Summoner name is required')
  .isLength({ min: 3, max: 16 })
  .withMessage('Summoner name must be between 3 and 16 characters');

const validateMatchCount = query('count')
  .optional()
  .isInt({ min: 1, max: 100 })
  .withMessage('Match count must be between 1 and 100');

module.exports = {
  validate,
  validateRegion,
  validateSummonerName,
  validateMatchCount,
};