import { Schema, UINT_32, ArrayType } from '../../parser';
import {
  AuthorizeConfig,
  AuthorizeResponse,
} from './interfaces/authorize-response.interface';

export const authorizeResponse = new Schema<AuthorizeResponse>({
  version: UINT_32,
  status: UINT_32,
  rows: UINT_32,
  config: new ArrayType<AuthorizeConfig>(
    'rows',
    new Schema<AuthorizeConfig>({
      delay: UINT_32,
      securityType: UINT_32,
      exchangeId: UINT_32,
    })
  ),
});
