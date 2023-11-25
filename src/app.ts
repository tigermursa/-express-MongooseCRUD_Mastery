import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/user/user.route';
//middle wears 
const app = express();
app.use(cors());
app.use(express.json());




//user routing
app.use('/api/data/users', userRouter);


//initial get request here
app.get('/', (req: Request, res: Response) => {
  res.send('The main server running !!');
});


//404 route here
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'this route did not found',
  });
});

export default app;