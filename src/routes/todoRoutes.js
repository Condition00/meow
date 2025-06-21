import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.user.id
        }
    })

    res.json(todos);
}
);


// Create a new todo
router.post('/', async (req, res) => {
    const {task} = req.body;

    const todo = await prisma.todo.create({
        data:{
            task,
            userId: req.user.id
        }
    })

    res.json(todo);
})

//update a todo
router.put('/:id', async (req, res) => {
    const {completed} = req.body;
    const {id} = req.params;

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.user.id
        },
        data: {
            completed: !!completed  // !! Convert to boolean (yaad !! rkhna)
        }
    })

    res.json(updatedTodo);
})


//delete a todo
router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId: req.user.id
        }
    })

    res.send({message: 'Todo deleted successfully'})
})

export default router;
