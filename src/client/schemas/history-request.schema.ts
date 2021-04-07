import { Schema, INT_8, UINT_32, STRING } from '../../parser';
import { HistoryRequest } from './interfaces/history-request.interface';

export const historyRequest = new Schema<HistoryRequest>({
  id: UINT_32,
  lowTime: UINT_32,
  highTime: UINT_32,
  count: UINT_32,
  resolution: UINT_32,
  sendNumber: UINT_32,
  compressing: INT_8,
  type: INT_8,
  symbol: STRING,
});
