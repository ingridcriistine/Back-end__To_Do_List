import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
    title: string,
    description: string,
    status: boolean,
    date: string
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
    date: { type: Date, required: true },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;