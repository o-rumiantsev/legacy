import { Struct } from '../../parser/struct';
import { StructType } from '../../parser/enums/struct-type.enum';
import { authorizeRequest } from '../schemas/authorize-request.schema';
import { AuthorizeRequest } from '../schemas/interfaces/authorize-request.interface';

export class AuthStruct extends Struct {
  constructor(instance: AuthorizeRequest) {
    super(StructType.STRUCT_AUTHORIZE, authorizeRequest.create(instance));
  }
}
