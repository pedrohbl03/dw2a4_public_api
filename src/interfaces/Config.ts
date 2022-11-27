export interface IConfig {
  env: string;
  port?: string;
  // eslint-disable-next-line camelcase
  mongodb_url: string;
  jwt: {
    secret: string;
    accessExpirationMinutes?: string;
    refreshExpirationDays?: string;
    resetPasswordExpirationMinutes?: string;
    verifyEmailExpirationMinutes?: string;
  };
  email?: {
    smtp?: {
      host?: string;
      port?: string;
      auth?: {
        user?: string;
        pass?: string;
      };
    };
    from?: string;
  };
}
