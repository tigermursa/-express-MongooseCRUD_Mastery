import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/user/user.route';

const app = express();

app.use(cors());
//parser
app.use(express.json());

//user router
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('The main server running !!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'this route did not found',
  });
});

export default app;