import { Lifecycle, scoped } from "tsyringe";

@scoped(Lifecycle.ResolutionScoped)
export class LoggerService {
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