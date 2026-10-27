import { Controller,Get,Param,ParseIntPipe,Body,Post,Patch,Delete,UseGuards} from "@nestjs/common";
import { BooksService } from "./books.service";

import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')

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
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.LIBRARIAN, Role.ADMIN)
create(@Body() createBookDto:CreateBookDto){
    return this.booksService.create(createBookDto);
}
@Patch(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
 @Roles(Role.LIBRARIAN, Role.ADMIN)
update(@Param("id",ParseIntPipe)id:number,@Body()updateBookDto:UpdateBookDto){
    return this.booksService.update(id,updateBookDto);
}
@Delete(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.LIBRARIAN, Role.ADMIN)
remove(@Param("id",ParseIntPipe)id:number){
    return this.booksService.remove(id);
}}