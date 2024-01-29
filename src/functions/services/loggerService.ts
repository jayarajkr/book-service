import { Lifecycle, scoped } from "tsyringe";

export interface LoggerService{
    setContext(lambdaName: string, userId: string):void;
    log(message: string):void;
}

@scoped(Lifecycle.ResolutionScoped)
export class LoggerServiceImpl implements LoggerService {
  private lambdaName: string = "";
  private userId: string = "";
  private logsLogged: number = 0;


  public setContext(lambdaName: string, userId: string) {
    this.lambdaName = lambdaName;
    this.userId = userId;
  }

  public log(message: string) {
    this.logsLogged++;
    
    console.log(JSON.stringify({
      lambdaName: this.lambdaName,
      personId: this.userId,
      logsLogged: this.logsLogged,
      message: message
    }));
  }
}