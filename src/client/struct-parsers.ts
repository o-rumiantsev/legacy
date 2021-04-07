import { StructType } from '../parser/enums/struct-type.enum';
import { echoMessage } from './schemas/echo-message.schema';
import { requestError } from './schemas/request-error.schema';
import { authorizeResponse } from './schemas/authorize-response.schema';
import { authorizeRequest } from './schemas/authorize-request.schema';
import { historyResponse } from './schemas/history-response.schema';
import { historyRequest } from './schemas/history-request.schema';

type Parser = (buffer: Buffer) => unknown;

export const parsers: Record<StructType, Parser> = {
  [StructType.STRUCT_ECHO]: (buffer: Buffer) => echoMessage.parse(buffer),
  [StructType.STRUCT_REQUEST_ERROR]: (buffer: Buffer) =>
    requestError.parse(buffer),
  [StructType.STRUCT_AUTHORIZE]: (buffer: Buffer) =>
    authorizeRequest.parse(buffer),
  [StructType.STRUCT_AUTHORIZE_RESPONSE]: (buffer: Buffer) =>
    authorizeResponse.parse(buffer),
  [StructType.STRUCT_HISTORY_REQUEST]: (buffer: Buffer) =>
    historyRequest.parse(buffer),
  [StructType.STRUCT_HISTORY_RESPONSE]: (buffer: Buffer) =>
    historyResponse.parse(buffer),
};
