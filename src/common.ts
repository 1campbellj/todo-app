import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export type TodoType = {
  name: string;
  dueDate: MaterialUiPickersDate | null;
  completionDate: MaterialUiPickersDate | null;
};
