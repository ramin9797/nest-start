import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository:typeof User,
        private roleService:RolesService
    ){

    }

    async createUser(dto:CreateUserDto){
        console.log('dt',dto);
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        console.log('user',role);
        await user.$set('roles',[role.id])        
        user.roles = [role]
        return user
    }

    async getUsers(){
        const users = await this.userRepository.findAll({include:{all:true}})
        console.log("users2",users)
        return users;
    }

    async getUserByEmail(email:string){
        const user = (await this.userRepository.findOne({where:{email},include:{all:true}}))?.dataValues;
        console.log(user,'user')
        return user;
    }

}
