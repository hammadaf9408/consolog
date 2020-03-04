export interface IResponseCollectionState<T> {
  success: boolean;
  count?: number;
  data?: T[];
}