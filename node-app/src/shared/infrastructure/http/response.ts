import { HttpError } from '../../domain/httpError';
import { HttpSuccess } from '../../domain/httpSucess';
import { Response } from "express";

export class HttpResponse  {

    success( message: string,  items?: any, total?: number) {
        const response:HttpSuccess = {
            message,
            items,
            total: total || null
        }
        return response;
    }

    failed(code: number, error: string) {
        const response: HttpError = {
            code,
            error,
            timestamp: new Date().toISOString()
        }
        return response;
    }

    handleError(res: Response, error: unknown)  {
        if (error instanceof Error) {
            return res.status(500).send(this.failed(500, error.message));
        } else {
            return res.status(500).send(this.failed(500, 'Internal Server Error'));
        }
    }

}