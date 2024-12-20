import  express, {Request, Response} from "express";
import dotenv from "dotenv";
const app = express();

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 4000;


app.get('/', (req: Request,res: Response)=> {
    res.status(200).json({
        message: "healthy"
    });
});

app.listen(3000, () => {
    console.log(`Server is running on ${PORT}`)
});
