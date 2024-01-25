export interface Book{
    bookId: number;
    bookName: string;
    isbn: string;
    description: string;
}

export class BookModel implements Book{
    bookId: number;
    bookName: string;
    isbn: string;
    description: string;

    constructor(bookId: number, bookName: string, isbn: string, description: string){
        this.bookId = bookId;
        this.bookName = bookName;
        this.isbn = isbn;
        this.description = description;
    }
}
