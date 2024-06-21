import { loginService } from '../services/loginService.js';
import { response } from '../../config/response.js';
import { errStatus } from '../../config/errorStatus.js';

export const login = async (req, res, next) => {
  const { studentId, password } = req.body;

  try {
    const result = await loginService(studentId, password);
    res.status(result.status).send(response(result));
  } catch (error) {
    res.status(error.data.status || errStatus.INTERNAL_SERVER_ERROR.status).send(response(error.data));
  }
};
