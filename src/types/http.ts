export interface PagarmeResponse<T> {
  success?: boolean;
  data?: T
  error?: PagarmeError
}

export interface PagarmeError {
  errors: PagarmeErrorData[]
  url: string;
  method: string;
  status: number;
}

export interface PagarmeErrorData {
  parameter_name?: string;
  type?: string;
  message?: string;
}