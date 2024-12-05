import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    sendMessage(createMessageDto: CreateMessageDto): Promise<{
        created_at: Date;
        message: string;
        user_id: number;
    } & import("./entities/message.entity").Message>;
    findAll(): string;
}
