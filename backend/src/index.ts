import  express, {Request, Response} from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute";
const app = express();
import  CookieParser  from "cookie-parser";

app.use(express.json());
app.use(CookieParser());

dotenv.config();
const PORT = process.env.PORT || 4000;


app.get('/', (req: Request,res: Response)=> {
    res.status(200).json({
        message: "healthy"
    });
});

app.use('/api/v1/auth', authRoutes);

app.listen(3000, () => {
    console.log(`Server is running on ${PORT}`)
});
