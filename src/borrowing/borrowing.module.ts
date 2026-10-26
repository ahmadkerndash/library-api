import{Module} from "@nestjs/common";
import { BorrowingService } from "./borrowing.service";
import{BooksModule} from "../books/books.module";
import { BorrowingController } from "./borrowing.controller";
import{UsersModule} from "../users/users.module";
@Module({
    imports:[BooksModule,UsersModule],
    providers:[BorrowingService],
    controllers:[BorrowingController]})
export class BorrowingModule{}  