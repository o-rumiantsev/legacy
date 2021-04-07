export enum StructType {
  // Outgoing
  STRUCT_ECHO = 1,
  STRUCT_AUTHORIZE = 2,
  // STRUCT_SYMBOL_REQUEST = 3,
  // STRUCT_REAL_REQUEST = 4,
  // STRUCT_FUNDAMENTAL_REQUEST = 5,
  STRUCT_HISTORY_REQUEST = 6,
  // STRUCT_CANCEL_HISTORY_REQUEST = 7,
  // STRUCT_NEWS_REQUEST = 8,
  // STRUCT_NEWS_HISTORY_REQUEST = 9,
  // STRUCT_ALL_INSTRUMENT_REQUEST = 10,

  // Incoming
  // STRUCT_QUOTE_MSG = 11,
  STRUCT_REQUEST_ERROR = 12,
  STRUCT_AUTHORIZE_RESPONSE = 13,
  // STRUCT_FUNDAMENTAL_MSG = 14,
  // STRUCT_NEWS_MSG = 15,
  // STRUCT_ALL_INSTRUMENTS_MSG = 16,
  // STRUCT_NEWS_HISTORY_MSG = 17,
  STRUCT_HISTORY_RESPONSE = 18,
}