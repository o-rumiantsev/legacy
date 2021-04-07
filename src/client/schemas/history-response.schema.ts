import {
  Schema,
  INT_8,
  UINT_32,
  FLOAT_32,
  STRING,
  ArrayType,
} from '../../parser';
import {
  HistoryBar,
  HistoryResponse,
} from './interfaces/history-response.interface';

export const historyResponse = new Schema<HistoryResponse>({
  id: UINT_32,
  count: UINT_32,
  highIndex: UINT_32,
  sourceSize: UINT_32,
  destinationSize: UINT_32,
  resolution: UINT_32,
  rows: UINT_32,
  type: INT_8,
  compressing: INT_8,
  symbol: STRING,
  bars: new ArrayType(
    'rows',
    new Schema<HistoryBar>({
      high: FLOAT_32,
      low: FLOAT_32,
      open: FLOAT_32,
      close: FLOAT_32,
      volume: UINT_32,
      time: UINT_32,
    })
  ),
});
