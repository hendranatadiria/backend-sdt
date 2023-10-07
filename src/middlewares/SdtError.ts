import { type Response } from "express";
class SdtError extends Error {

  public httpCode: number;
  public data: any;

  constructor(httpCode:number, message: string, data: any) {
    super(message);
    this.httpCode = httpCode;
    this.data = data;
  }

  public getError() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
    }
  }

  public toExpressResponse(res: Response) {
    res.status(this.httpCode).jsonOriginal(this.getError());
  }

}

export default SdtError;