import express from 'express';
import cors from 'cors';
import mongoConnect from './config/db.congif';
import authRoutes from './routes/auth.routes';
import StaffRoutes from './routes/staff.routes';
import AdminRoutes from './routes/admin.routes';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', StaffRoutes);
app.use('/api', AdminRoutes);


app.get("/", (req, res) => {
    res.status(200).json({ 
      message: "Welcome to ALMS API." 
    });
});

app.use((req, res) => {
  res.type('json').status(404).json({
      message: '404 Endpoint not found',
      status: 404
  });
});

app.listen(3456, () => console.log(`Server is running on port 3456.`));
mongoConnect();
