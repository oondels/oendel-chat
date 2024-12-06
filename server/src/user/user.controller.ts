import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { emailUser, password } = loginUserDto;

    let checkUser = await this.userService.findByEmail(emailUser);
    if (!checkUser) {
      checkUser = await this.userService.findByUsername(emailUser);
    }

    if (!checkUser) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
        name: checkUser.name,
        username: checkUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.cookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return {
      message: 'Successfully logged in!',
      user: {
        id: checkUser.id,
        name: checkUser.name,
        username: checkUser.username,
      },
    };
  }
}
