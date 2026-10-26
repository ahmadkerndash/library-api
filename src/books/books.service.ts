import { Injectable, NotFoundException ,ConflictException} from "@nestjs/common";
import{Book} from "./book.interface";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
@Injectable()
export class BooksService{
    create(createBookDto:CreateBookDto):Book{
        const newBook:Book={
            //كنت كاتب هنا id:this.books.length+1 لكن هذا غير صحيح لان لو حذفت كتاب من المصفوفة و اضفت كتاب جديد سيصبح id مكرر
            //استخدمت chatgpt 
            id:this.books.length>0?
            Math.max(...this.books.map((book)=>book.id))+1:1,
            title:createBookDto.title,
            author:createBookDto.author,
            isBorrowed:false
        };
        this.books.push(newBook);
        return newBook;
    }
    private books:Book[]=[
        {id:1,title:"Book 1",author:"Author 1",isBorrowed:false},
        {id:2,title:"Book 2",author:"Author 2",isBorrowed:false},
        {id:3,title:"Book 3",author:"Author 3",isBorrowed:false},
    ];
    findAll():Book[]{
        return this.books;
    }
    findOne(id:number):Book{
        const book=this.books.find((book)=>book.id===id);
        if(!book){
            throw new NotFoundException('Book not found');
        }
        return book;

    }
update(id:number,updateBookDto:UpdateBookDto):Book{
   const book=this.findOne(id);
   if(updateBookDto.title!==undefined){
    book.title=updateBookDto.title;
   }
   if(updateBookDto.author!==undefined){
    book.author=updateBookDto.author;
   }
  return book;
}
remove(id: number): Book {
  const bookIndex = this.books.findIndex(
    (book) => book.id === id,
  );

  if (bookIndex === -1) {
    throw new NotFoundException('Book not found');
  }

  const book = this.books[bookIndex];

  if (book.isBorrowed) {
    throw new ConflictException(
      'Cannot delete a borrowed book',
    );
  }

  const [deletedBook] = this.books.splice(bookIndex, 1);

  return deletedBook;
}
}