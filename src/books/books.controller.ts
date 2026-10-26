import { Controller,Get,Param,ParseIntPipe,Body,Post,Patch,Delete,UseGuards} from "@nestjs/common";
import { BooksService } from "./books.service";

import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.emum';
import { RolesGaurd } from '../auth/roles.guard';

@Controller('books')
@UseGuards(RolesGaurd)
export class BooksController{
    constructor(private readonly booksService:BooksService){}

@Get()
findAll(){
    return this.booksService.findAll();
}
@Get(':id')
findOne(@Param('id',ParseIntPipe) id:number){
    return this.booksService.findOne(id);
}
@Post()
@Roles(Role.LIBRARIAN, Role.ADMIN)
create(@Body() createBookDto:CreateBookDto){
    return this.booksService.create(createBookDto);
}
@Patch(':id')
 @Roles(Role.LIBRARIAN, Role.ADMIN)
update(@Param("id",ParseIntPipe)id:number,@Body()updateBookDto:UpdateBookDto){
    return this.booksService.update(id,updateBookDto);
}
@Delete(':id')
@Roles(Role.LIBRARIAN, Role.ADMIN)
remove(@Param("id",ParseIntPipe)id:number){
    return this.booksService.remove(id);
}}