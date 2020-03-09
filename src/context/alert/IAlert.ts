import { AlertType } from "./AlertType";

export interface IAlert {
  type: AlertType | undefined;
  message: string;
}