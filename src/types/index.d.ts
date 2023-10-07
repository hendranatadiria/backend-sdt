import { Express } from "express";
declare global{
    namespace Express {
        export interface Response{
            jsonOriginal(data: any): any;
        }
    }
}