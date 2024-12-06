import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('O email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }
}
