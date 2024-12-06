import { User } from '../../user/entities/user.entity';
export declare class Message {
    id: number;
    message: string;
    user_id: number;
    created_at: Date;
    user: User;
}
