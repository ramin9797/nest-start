import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example:'email@gmail.com',description:"Email"})
    readonly email:string;

    @ApiProperty({example:'password1234',description:"Password"})
    readonly password:string;
}