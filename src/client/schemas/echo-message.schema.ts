import { Schema, UINT_32 } from '../../parser';
import { EchoMessage } from './interfaces/echo-message.interface';

export const echoMessage = new Schema<EchoMessage>({ time: UINT_32 });
