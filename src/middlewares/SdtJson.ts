import { Request, Response, NextFunction } from "express";

export default function(req:Request, res: Response, next: NextFunction) {
  console.log(`📝 Request received on ${new Date().toLocaleString()} | ${req.method} ${req.originalUrl} with body `, req.body);
  const oldJson = res.json;
  res.jsonOriginal = oldJson;
  res.json = (data:any) => {
    const result = {
      responseTime: new Date().toISOString(),
      data,
      status: 'success',
    };
    return oldJson.call(res, result);
  }
  next();
}