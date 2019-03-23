export interface IDatabaseOperationResponse<T> {
  message: string | null;
  error: string | null;
  data?: T;
}

export type DatabaseResponse<T> = IDatabaseOperationResponse<T>;
