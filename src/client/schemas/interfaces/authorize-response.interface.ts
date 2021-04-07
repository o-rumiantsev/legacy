export interface AuthorizeConfig {
  delay: number;
  securityType: number;
  exchangeId: number;
}

export interface AuthorizeResponse {
  version: number;
  status: number;
  rows: number;
  config: AuthorizeConfig[];
}
