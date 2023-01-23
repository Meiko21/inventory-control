import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email().required('Email field is required'),
  password: Yup.string().min(6).required('Password field is required')
});

export const authRequestValidator = async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

