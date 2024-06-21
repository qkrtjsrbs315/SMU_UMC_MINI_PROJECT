// config/successStatus.js

import { StatusCodes } from "http-status-codes";

export const successStatus = {
    // success
    ISSUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 2000, message: "로그인 성공" },
    JOIN_SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 2001, message: "회원가입 성공입니다." }
};
