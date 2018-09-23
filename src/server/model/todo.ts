import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

/** Import IUser interface for User model */
import { ITodo } from '@shared/todo';

@Entity()
export class Todo extends BaseEntity implements ITodo {
    /** Check whether the user is a valid User */
    static isValid(todo: ITodo): todo is Todo {
        if (!todo.todo) throw new Error('EMPTY_STRING');
        return true;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', default: '' })
    public todo: string;

    @Column({ type: 'integer', default: 0 })
    public priority: number;
}