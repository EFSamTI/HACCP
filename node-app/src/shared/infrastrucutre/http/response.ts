import { HttpError } from '../../domain/httpError';
import { HttpSuccess } from '../../domain/httpSucess';
import { response } from '../dependencies';

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
}