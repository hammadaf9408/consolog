import { INotesTodo } from "./INotesTodo";
import { INotesDueDate } from "./INotesDueDate";

export interface INotes {
  _id: string;
  title?: string;
  note?: string;
  dueDate?: INotesDueDate;
  todo: INotesTodo[];
  user: string;
  createdAt: string;
}