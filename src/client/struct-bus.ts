import { Subject } from 'rxjs';
import { EchoMessage } from './schemas/interfaces/echo-message.interface';
import { StructType } from '../parser/enums/struct-type.enum';
import { AuthorizeResponse } from './schemas/interfaces/authorize-response.interface';
import { RequestError } from './schemas/interfaces/request-error.interface';
import { HistoryResponse } from './schemas/interfaces/history-response.interface';

export class StructBus {
  echoMessages = new Subject<EchoMessage>();
  requestErrors = new Subject<RequestError>();
  authorizeResponses = new Subject<AuthorizeResponse>();
  historyResponses = new Subject<HistoryResponse>();

  push(structType: StructType, message: unknown) {
    switch (structType) {
      case StructType.STRUCT_ECHO:
        this.echoMessages.next(message as EchoMessage);
        break;
      case StructType.STRUCT_REQUEST_ERROR:
        this.requestErrors.next(message as RequestError);
        break;
      case StructType.STRUCT_AUTHORIZE_RESPONSE:
        this.authorizeResponses.next(message as AuthorizeResponse);
        break;
      case StructType.STRUCT_HISTORY_RESPONSE:
        this.historyResponses.next(message as HistoryResponse);
        break;
    }
  }
}
