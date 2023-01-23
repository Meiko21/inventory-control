import * as Yup from 'yup';

const schema = Yup.object().shape({
  employee_id: Yup.string().uuid().required(),
  inventory_id: Yup.string().uuid().required(),
  type: Yup.string().oneOf(["Entry", "Exit"]),
  quantity: Yup.number().integer().required()
    .when('type', (type, schema) => {
      if (type === "Entry") {
        return schema.min(1);
      }

      if (type == "Exit") {
        return schema.max(-1);
      }
    })
});

export const validateCreateTransactionRequest = async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

