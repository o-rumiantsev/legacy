export interface HistoryBar {
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
  time: number;
}

export interface HistoryResponse {
  id: number;
  count: number;
  highIndex: number;
  sourceSize: number;
  destinationSize: number;
  resolution: number;
  rows: number;
  type: number;
  compressing: number;
  symbol: string;
  bars: HistoryBar[];
}
