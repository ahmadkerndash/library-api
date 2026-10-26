import { Injectable,BadRequestException,NotFoundException, ForbiddenException, ConflictException } from "@nestjs/common";
import { Borrowing } from "./borrowing.inerface";
import { BooksService } from "../books/books.service";
import { Book } from "../books/book.interface";
import { UsersService } from "../users/users.service";
@Injectable()
export class BorrowingService{
    private borrowings:Borrowing[]=[];
    constructor(private readonly booksService: BooksService,
        private readonly usersService:UsersService
    ) {}
    //حساب عدد الكتب المستعارة من قبل المستخدم
countActiveBorrowings(userId: number): number {
        return this.borrowings.filter((borrowing) => borrowing.userId === userId &&
        borrowing.isReturned === false).length;
    }
    borrowBook(userId: number, bookId: number): Borrowing {
        const user = this.usersService.findOne(userId);// البحث عن المستخدم باستخدام خدمة المستخدمين
        if(!user.isActive){// التحقق مما إذا كان المستخدم نشطًا
            throw new ForbiddenException('your account is deactivated, you cannot borrow books.');// إذا كان المستخدم غير نشط، يتم رمي استثناء منع الوصول
        }
        const existingBorrowing=this.borrowings.find((borrowing)=>borrowing.userId===userId&&//منع المستخدمين من استعارة الكتاب نفسه مرتين
                                         borrowing.bookId===bookId && !borrowing.isReturned);
            if(existingBorrowing){
                throw new ConflictException('you have already borrowed this book.');
            }
        const book: Book = this.booksService.findOne(bookId);// البحث عن الكتاب باستخدام خدمة الكتب
        if(book.isBorrowed){// التحقق مما إذا كان الكتاب مستعار بالفعل
            throw new BadRequestException('This book is already borrowed.');
        }
        const activeCount=this.countActiveBorrowings(userId);// حساب عدد الكتب المستعارة من قبل المستخدم
        if(activeCount>=3){// التحقق مما إذا كان المستخدم قد استعاره بالفعل 3 كتب
            throw new BadRequestException('You cannot borrow more than 3 books at a time.');
        }
        const borrowing: Borrowing = {// إنشاء كائن استعارة جديد
            id: this.borrowings.length + 1,
            bookId: book.id,
            userId,
            isReturned: false,
        };
        this.borrowings.push(borrowing);// إضافة الاستعارة إلى قائمة الاستعارات
        book.isBorrowed = true;
        return borrowing;
    }
    returnBook(userId: number, bookId: number): Borrowing {
        const borrowing = this.borrowings.find(//البحث عن الاستعارة النشطة للمستخدم والكتاب المحدد
            (item) => item.userId === userId && item.bookId === bookId && item.isReturned===false,
        );
        if (!borrowing) {// التحقق مما إذا كانت الاستعارة موجودة أم لا
            throw new NotFoundException('Active borrowing not found for this user and book.');
        }
       const book: Book = this.booksService.findOne(bookId);
        borrowing.isReturned = true;
        book.isBorrowed = false;
        return borrowing;
    }
fiindByUser(userId: number): Borrowing[] {// البحث عن جميع الاستعارات للمستخدم المحدد
        return this.borrowings.filter((borrowing) => borrowing.userId === userId);
}
findAll(): Borrowing[] {// البحث عن جميع الاستعارات
        return this.borrowings;
}}