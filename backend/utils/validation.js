// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()

      .reduce((e, err) =>  {
        e[err.param] = err.msg
        return e;
      }, {});


    _res.status(400)
    _res.json({
        "message":"Validation error",
        "statusCode": 400,
        "error": errors
      })
    // const err = Error('My error');
    // err.errors = errors;
    // err.status = 400;
    // err.title = 'My error';
    // next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
