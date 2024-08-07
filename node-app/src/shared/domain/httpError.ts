export interface HttpError {
    code: number;
    error: string;
    timestamp: string;
}

interface HttpErrorWithContext extends HttpError {
    context: Record<string, unknown>;
}

type SimpleHttpError = HttpError;

export type HttpErrorMessage = SimpleHttpError | HttpErrorWithContext;