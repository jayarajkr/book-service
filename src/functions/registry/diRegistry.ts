import "reflect-metadata"
import { container, Lifecycle } from 'tsyringe';
import { BookServiceImpl } from "../services/bookService";
import { LoggerServiceImpl } from "../services/loggerService";


container.register('bookService', BookServiceImpl);
container.register('loggerService',LoggerServiceImpl)
export const diContainer = container;