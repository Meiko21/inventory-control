import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().strict().required(),
  internal_code: Yup.string().min(5).max(5).required()
});

export const validateCreateEmployeeRequest = async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

