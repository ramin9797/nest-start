import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags("users")
@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){

    }

    
    @ApiOperation({summary:'Create users'})
    @ApiResponse({status:200,type:User})
    @Post('create')
    create(@Body() userDto:CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @UseGuards(AuthGuard)
    @Get("all")
    getAll(){
        return this.usersService.getUsers();
    }
}
