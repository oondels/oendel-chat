import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
    sendMessage(createMessageDto: CreateMessageDto): Promise<{
        created_at: Date;
        message: string;
        user_id: number;
    } & Message>;
    findAll(): string;
}
