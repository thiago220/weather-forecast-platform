import { query, body, validationResult } from "express-validator";

export const sanitizeCity = [
  query("city")
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage("Cidade inválida"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

export const sanitizeCoordinates = [
  query("lat")
    .trim()
    .escape()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude inválida"),
  query("lon")
    .trim()
    .escape()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude inválida"),
  handleErrors,
];

export const sanitizeLogin = [
  body("email").trim().normalizeEmail().isEmail().withMessage("Email inválido"),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage("Senha muito curta"),
  handleErrors,
];

function handleErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
}
