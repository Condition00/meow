import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';


const app = express();
const PORT = process.env.PORT || 5003;

// get file path from url of the current module
const __filename = fileURLToPath(import.meta.url);
// get directory name from file path
const __dirname = dirname(__filename);

//m
app.use(express.json())

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//rotes

app.get('/auth', authRoutes);
app.use('/todos',authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
