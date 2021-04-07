import { Schema, UINT_32 } from '../../parser';

export const requestError = new Schema({
  requestId: UINT_32,
});
