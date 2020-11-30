import { client } from 'pagarme';

class PagarmeClient {
  private static instance: any;

  static get client(): Promise<any> {
    if (!this.instance) {
      return client.connect({ api_key: process.env.API_KEY })
        .then((client: any) => {
          this.instance = client

          return this.instance;
        })
    }

    return this.instance;
  }
}

export default PagarmeClient;