import mongoose from 'mongoose';

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
  important: boolean;
  category: 'learn' | 'code' | 'chores' | 'errands' | 'other';
  movedFrom?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  important: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ['learn', 'code', 'chores', 'errands', 'other'],
    default: 'other',
  },
  movedFrom: {
    type: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
