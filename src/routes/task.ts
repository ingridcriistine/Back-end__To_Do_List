import express, { Request, Response, Router } from 'express';
import Task from '../models/Task.ts';
const router: Router = express.Router();

router
    .post('/register', async (req: Request, res: Response) => {
        const { title, description, date } = req.body;
        try {
            const task = new Task({ title, description, date });
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar Task', error });
        }
    })
    .get('/task', async (req: Request, res: Response) => {
        try {
            const task = await Task.find();
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar Tasks', error });
        }
    })
    .put('/task/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, date } = req.body;

        try {
            const task = await Task.findByIdAndUpdate(id, { title, description, date }, { new: true });
            if (!task) {
                res.status(404).json({ message: 'Task não encontrada' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar Task', error });
        }
    })
    .delete('/task/:id', async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const task = await Task.findByIdAndDelete(id);
            if (!task) {
                res.status(404).json({ message: 'Task não encontrada' });
            }
            res.status(200).json({ message: 'Task deletada com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao deletar Task', error });
        }
    });

export default router;