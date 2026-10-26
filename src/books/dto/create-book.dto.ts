import { IsString, IsNotEmpty,MaxLength } from 'class-validator';
export class CreateBookDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    title:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    author:string;
}