import { HttpError } from '../../domain/httpError';
import { HttpSuccess } from '../../domain/httpSucess';
import { response } from '../dependencies';

export class HttpResponse  {

    success(code: number, message: string,  data?: any) {
        const response:HttpSuccess = {
            code,
            message,
            data
        }
        return response;
    }

    failed(code: number, error: string, timestamp: string) {
        const response: HttpError = {
            code,
            error,
            timestamp
        }
        return response;
    }
}