export const validate = schemaName => {
    return function (req, res, next) {
      const isValid = schemaName.validate(req.body)
  
      if (!isValid.error) return next()
  
      return res
        .status(400)
        .json({ message: 'ValidationError', data: isValid.error.details })
    }
  }