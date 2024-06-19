//index.js

import express from 'express';
import { errStatus } from './config/errorStatus.js';
import { response } from './config/response.js';
import { specs } from './config/swagger.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors';
import { postRouter } from './srcs/routes/post.route.js';

const app = express();
const port = 3000;

app.set('port', process.env.PORT || 3000); // 서버 포트 지정
app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
dotenv.config(); // .env 파일 사용 (환경 변수 관리)

// swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);


// routes
app.use('/api/posts', postRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res
    .status(errStatus.INTERNAL_SERVER_ERROR || err.data.status)
    .send(response(err.data));
});

app.use('api/login', loginRouters)
app.use('api/signup', signupRouters)



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB!');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};

connectDB();
