import { ok } from '../utils/apiResponse.js';
import { loginUser, registerUser } from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    return ok(res, result, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    return ok(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};
