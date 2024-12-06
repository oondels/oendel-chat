import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    loginUser(loginUserDto: LoginUserDto, res: Response): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            username: string;
        };
    }>;
}
