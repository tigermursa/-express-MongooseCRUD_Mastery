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
  const html = `
    <html>
      <head>
        <style>
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            color: green;
          }
        </style>
      </head>
      <body>
        <h1>The main server running well!!  check all the api from gitHub Readme file</h1>
      </body>
    </html>
  `;
  res.send(html);
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;