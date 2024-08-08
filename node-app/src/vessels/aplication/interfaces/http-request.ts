
export interface HttpRequest {
    url: string;
    source: string;
    destination: string;
    operation: string;
    verb: string;
    path: string;
    body?: any;
    feedback?: any;
}