import { signupService } from '../services/signupService.js';
import { response } from '../../config/response.js';
import { errStatus } from '../../config/errorStatus.js';

export const signup = async (req, res, next) => {
    const { studentId, password } = req.body;

    try {
        const result = await signupService(studentId, password);
        res.status(result.status).send(response(result));
    } catch (error) {
        res.status(error.data.status || errStatus.INTERNAL_SERVER_ERROR.status).send(response(error.data));
    }
};
