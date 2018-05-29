import { ConnectionOptions } from 'mongoose';

export class DefaultConfig {
  public static port: any = process.env.KONOS_API_PORT || 3000;
  public static database: string =
    process.env.CT_API_DATABASE ||
    'mongodb://testuser:1234@ds139920.mlab.com:39920/konos';
  public static dbOptions: ConnectionOptions = {
    keepAlive: 300000,
    connectTimeoutMS: 30000
  };
}
