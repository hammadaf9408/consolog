import { INoteDuedatePayload } from "./INoteDuedatePayload";
import { INoteTodoPayload } from "./INoteTodoPayload";

export interface INotePayload {
  title: string;
  note: string;
  dueDate: INoteDuedatePayload;
  todo: INoteTodoPayload[];
}