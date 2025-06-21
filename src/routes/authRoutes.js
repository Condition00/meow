import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // save username and encrypted password to database

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user to database and hashed password aswell
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
    })    // now we have a user, I add their first todo item
    const defaultTodo = `First todo for ${username}`;
    await prisma.todo.create({
        data: {
            title: defaultTodo,
            userId: user.id
        }
    })

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token})    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }
})

router.post('/login', async (req, res) => {
     // we get their email, and we look up the password associated with that email in the database
     // but we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
     // so what we can to do, is again, one way encrypt the password the user just entered

    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        console.log(user)

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

export default router;
