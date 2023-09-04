import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService:UsersService,private jwtService:JwtService){}

    async login(userDto:CreateUserDto){
        const user = await this.validateUser(userDto);
        console.log("user",user);
        return await this.generateToken(user) 
    }

    async registration(userDto:CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate){
            throw new HttpException('User with email already exists',HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password,5)
        const user = await this.userService.createUser({...userDto,password:hashPassword});
        return await this.generateToken(user)
    }

    async generateToken(user:User){
        const payload = {email:user.email,id:user.id,roles:user.roles}

        return {
            token:this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto:CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password,user.password)

        if(!passwordEquals){
            throw new UnauthorizedException({message:"Date is not correct"})
        }

        return user; 
    }

}
