import "reflect-metadata";
import { APIGatewayProxyEvent } from "aws-lambda";
import { LambdaResponse } from "../types/types";
import { inject, injectable } from "tsyringe";
import { LoggerService } from "../services/loggerService";
import { ResponseUtils } from "../utils/responseUtils";
import { Book } from "../models/bookModel";
import { BookService } from "../services/bookService";
import { diContainer } from "../registry/diRegistry";


@injectable()
export class BookController {
    private loggerService: LoggerService;
    
    private bookService: BookService;

    constructor(@inject("loggerService") loggerService: LoggerService,
         @inject("bookService") bookService: BookService) {
        this.loggerService = loggerService;
        this.bookService = bookService;
     }

    public async list(event: APIGatewayProxyEvent): Promise<LambdaResponse> {
        this.loggerService.setContext("listBooks", "123");
        this.loggerService.log("Starting..");
        return this.bookService.listBooks().then(books=>{
            return ResponseUtils.buildResponse(200, books);
        });
    }

    public async create(event: APIGatewayProxyEvent): Promise<LambdaResponse>{
        const book: Book = JSON.parse(event.body||'{}');
        return this.bookService.createBook(book).then(savedBook=>{
            return ResponseUtils.buildResponse(201, savedBook);
        });
    }

    public async update(event: APIGatewayProxyEvent): Promise<LambdaResponse>{
        const bookId: number = (event.pathParameters?.id||-1) as number;
        const book: Book = JSON.parse(event.body||'{}');
        return this.bookService.updateBook(bookId, book).then(updatedBook=>{
            return ResponseUtils.buildResponse(200, updatedBook);
        });
    }

    public async delete(event: APIGatewayProxyEvent): Promise<LambdaResponse>{
        const bookId: number = (event.pathParameters?.bookId||-1) as number;
        return this.bookService.deleteBook(bookId).then(deleteStatus=>{
            console.log(`deleteStatus:${deleteStatus}`);
            if(deleteStatus == true){
                return ResponseUtils.buildResponse(204, 'Success');
            }
            return ResponseUtils.buildResponse(500, 'Error');
        });
    }

    public async get(event: APIGatewayProxyEvent): Promise<LambdaResponse>{
        const bookId: number = (event.pathParameters?.bookId||-1) as number;
        this.loggerService.log(`bookId:${bookId}`);
        return this.bookService.getBook(bookId).then(book=>{
            if(book){
                return ResponseUtils.buildResponse(200, book);
            }
            return ResponseUtils.buildResponse(400, 'Not found');
        })
        
    }
};

export const list = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    console.log("Invoking..list");
    const controller = diContainer.resolve(BookController);
    return controller.list(event);
};

export const create = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    console.log("Invoking..");
    const controller = diContainer.resolve(BookController);
    return controller.create(event);
};

export const update = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    console.log("Invoking..");
    const controller = diContainer.resolve(BookController);
    return controller.update(event);
};

export const remove = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    console.log("Invoking..");
    const controller = diContainer.resolve(BookController);
    return controller.delete(event);
};

export const get = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    console.log("Invoking..");
    const controller = diContainer.resolve(BookController);
    return controller.get(event);
};