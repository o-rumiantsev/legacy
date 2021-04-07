export interface HistoryRequest {
  id: number;
  lowTime: number;
  highTime: number;
  count: number;
  resolution: number;
  sendNumber: number;
  compressing: number;
  type: number;
  symbol: string;
}
