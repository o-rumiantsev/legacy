import { Schema, STRING } from '../../parser';
import { AuthorizeRequest } from './interfaces/authorize-request.interface';

export const authorizeRequest = new Schema<AuthorizeRequest>({
  login: STRING,
  password: STRING,
});
