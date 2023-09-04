import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, Model,Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-model.model";

interface UserCreationAttr{
    email:string;
    password:string;
}

@Table({tableName:"users"})
export class User extends Model<User,UserCreationAttr>{

    @ApiProperty({example:'1',description:"Unique id"})
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;

    @ApiProperty({example:'email@gmail.com',description:"Email"})
    @Column({type:DataType.STRING,unique:true,allowNull:false})
    email:string;

    @ApiProperty({example:'password1234',description:"Password"})
    @Column({type:DataType.STRING,allowNull:false})
    password:string;

    @ApiProperty({example:'true',description:"Banned"})
    @Column({type:DataType.BOOLEAN,defaultValue:false})
    banned:boolean;

    @ApiProperty({example:'za xuliqanstvo',description:"Banned reason"})
    @Column({type:DataType.STRING,allowNull:true})
    banReason:string;

    @BelongsToMany(()=>Role,()=>UserRoles)
    roles:Role[]
}