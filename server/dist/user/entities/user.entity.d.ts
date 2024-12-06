import { Message } from '../../message/entities/message.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
    messages: Message[];
}
