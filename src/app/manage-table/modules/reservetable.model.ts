import { Statuses} from './status.enum';

export interface ReserveTable {

  id?:string;
  tableNumber: number;
  capacity: number;
  pph?: number;
  status?: Statuses;
}
