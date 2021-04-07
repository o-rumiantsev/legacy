import { Struct } from '../../parser/struct';
import { StructType } from '../../parser/enums/struct-type.enum';
import { echoMessage } from '../schemas/echo-message.schema';
import { EchoMessage } from '../schemas/interfaces/echo-message.interface';

export class EchoStruct extends Struct {
  constructor(instance: EchoMessage) {
    super(StructType.STRUCT_ECHO, echoMessage.create(instance));
  }
}
