interface HttpSuccessWithContext extends HttpSuccess {
    context: Record<string, unknown>;
}

type SimpleHttpSuccess = HttpSuccess;

export type HttpSuccessMessage = SimpleHttpSuccess | HttpSuccessWithContext;

export interface HttpSuccess {
    message: string;
    items?: any;
    total?: number | null;
}