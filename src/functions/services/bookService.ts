import { Book, BookModel } from "../models/bookModel";
import { injectable } from 'tsyringe';


export interface BookService{
    createBook(book:Book):Promise<Book>;
    updateBook(bookId:number, book:Book):Promise<Book>;
    deleteBook(bookId:number):Promise<boolean>;
    getBook(bookId:number):Promise<Book>;
    listBooks():Promise<Book[]>;
}
@injectable()
export class BookServiceImpl implements BookService{
    public async createBook(book:Book):Promise<Book>{
        return book;
    }

    public async updateBook(bookId:number, book:Book):Promise<Book>{
        return book;
    }

    public async deleteBook(bookId:number):Promise<boolean>{
        return true;
    }

    public async getBook(bookId:number):Promise<Book>{
        const books:Book[] = [new BookModel(1,"Jathaka Kathakal","123","Tales"),new BookModel(2,"15 shades","2234","Novel")];
        return books.find((book)=>book.bookId == bookId) as Book;
        
    }
    public async listBooks():Promise<Book[]>{
        const book1: Book = new BookModel(1,"Jathaka Kathakal","123","Tales");
        const book2: Book = new BookModel(2,"15 shades","2234","Novel");
        return [book1, book2];
    }
}