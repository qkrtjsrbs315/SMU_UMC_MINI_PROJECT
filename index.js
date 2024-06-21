import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { signupRouter } from './srcs/routes/signupRouter.js'; 
import { loginRouter } from './srcs/routes/loginRouter.js'; 
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';  // Import the swagger specs
import { errStatus } from './config/errorStatus.js';
import { response } from './config/response.js';

dotenv.config();

// port 번호 3000
const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/signup', signupRouter); // 회원가입 엔드포인트
app.use('/api/login', loginRouter); // 로그인 엔드포인트

// Error handling middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  const status = err.status || errStatus.INTERNAL_SERVER_ERROR.status;
  res.status(status).send(response(err));
});

// MongoDB 연결 & 서버 시작 
const connectDB = async () => {
  try {
      await mongoose.connect(
          `mongodb+srv://Admin:${process.env.DB_PASSWORD}@backenddb.xna3tlg.mongodb.net/Node-API`,
          { useNewUrlParser: true, useUnifiedTopology: true }
      );
      console.log('Connected to MongoDB');
      app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
      });
  } catch (error) {
      console.error('Connection to MongoDB failed:', error.message);
      process.exit(1);
  }
};

connectDB();
