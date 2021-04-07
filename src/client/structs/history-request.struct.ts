import { Struct } from '../../parser/struct';
import { StructType } from '../../parser/enums/struct-type.enum';
import { historyRequest } from '../schemas/history-request.schema';
import { HistoryRequest } from '../schemas/interfaces/history-request.interface';

export class HistoryRequestStruct extends Struct {
  constructor(instance: HistoryRequest) {
    super(StructType.STRUCT_HISTORY_REQUEST, historyRequest.create(instance));
  }
}
