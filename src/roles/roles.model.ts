import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model,Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-model.model";

interface RolesCreationAttr{
    value:string;
    description:string;
}

@Table({tableName:"roles"})
export class Role extends Model<Role,RolesCreationAttr>{

    @ApiProperty({example:'1',description:"Unique id"})
    @Column({type:DataType.INTEGER,unique:true,primaryKey:true,autoIncrement:true})
    id:number;

    @ApiProperty({example:'admin',description:"Role name"})
    @Column({type:DataType.STRING,unique:true,allowNull:false})
    value:string;

    @ApiProperty({example:'Admin role',description:"description"})
    @Column({type:DataType.STRING,allowNull:false})
    description:string;


    @BelongsToMany(()=>User,()=>UserRoles)
    users:User[]
    
}