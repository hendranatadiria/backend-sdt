import * as yup from 'yup';
declare module 'yup' {
  export interface Schema {
    ianaTz(message?: string): this;
    singleEmail(message?: string, returnOnNull?:boolean): this;
  }
}