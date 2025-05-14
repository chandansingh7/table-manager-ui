import { Statuses} from './status.enum';

export interface ReserveTable {

  id?:number;
  tableNumber: number;
  capacity?: number;
  pph?: number;
  status?: Statuses;
}
