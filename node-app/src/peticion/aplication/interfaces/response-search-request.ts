

export interface ResponseSearchRequestByType {
  search_request_by_type: Searchrequestbytype;
}

export interface Searchrequestbytype {
  id: number;
  type: string;
  url: string;
  source: string;
  destination: string;
  operation: string;
  verb: string;
  path: string;
  state: boolean;
}