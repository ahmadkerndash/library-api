import { Body,Controller,Post,ParseIntPipe,Param,Get ,UseGuards} from "@nestjs/common";
import{ BorrowingService } from "./borrowing.service";
import { Borrowing } from "./borrowing.inerface";
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.emum';
import { RolesGaurd } from '../auth/roles.guard';


@Controller('borrowings')
@UseGuards(RolesGaurd)
export class BorrowingController{
    constructor(private readonly borrowingService:BorrowingService){}
@Post(':userId/books/:bookId')
@Roles(Role.MEMBER, Role.ADMIN)
borrowBook(@Param('userId',ParseIntPipe) userId:number,@Param('bookId',ParseIntPipe)bookId:number){
    return this.borrowingService.borrowBook(userId,bookId);
}
@Post(':userId/books/:bookId/return')//اضفت return حتى يختلف عن مشار الاستعاره
@Roles(Role.MEMBER, Role.ADMIN)
returnBook(@Param('userId',ParseIntPipe) userId:number,@Param('bookId',ParseIntPipe)bookId:number){
    return this.borrowingService.returnBook(userId,bookId);
}
@Get(':userId')
@Roles(Role.MEMBER, Role.ADMIN)
fiindByUser(@Param('userId',ParseIntPipe) userId:number): Borrowing[] {
    return this.borrowingService.fiindByUser(userId);
}
@Get()
@Roles(Role.LIBRARIAN, Role.ADMIN)
findAll(): Borrowing[] {
    return this.borrowingService.findAll();
}}