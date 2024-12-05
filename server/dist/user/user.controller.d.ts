import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
}
