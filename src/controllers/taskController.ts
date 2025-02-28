import express, { Request, Response, Router } from 'express';
import Task from '../models/Task.ts';
import { prisma } from '../lib/prisma.ts'

class TaskController {
    static createTask(req: Request, res: Response) {
        const { title, description, status, date } = req.body;
        try {
            const task = prisma.task.create({ 
                data: {
                    title: title, 
                    description: description, 
                    status: status, 
                    date: date
                } 
            });

            res.status(201).json(task);

        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar Task', error });
        }
    };

    static getTasks(req: Request, res: Response) {
        try {
            const task = prisma.task.findMany();
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar Tasks', error });
        }
    }
    
    static updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, status, date } = req.body;
    
        try {
            const task = Task.findByIdAndUpdate(id, { title, description, status, date }, { new: true });
            if (!task) {
                res.status(404).json({ message: 'Task não encontrada' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar Task', error });
        }
    }

    static deleteTask(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
            const task = Task.findByIdAndDelete(id);
            if (!task) {
                res.status(404).json({ message: 'Task não encontrada' });
            }
            res.status(200).json({ message: 'Task deletada com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao deletar Task', error });
        }
    };
}

export default TaskController;