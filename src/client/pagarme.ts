import { client } from 'pagarme';

class PagarmeClient {
  private static instance: any;

  static get client(): Promise<any> {
    if (!this.instance) {
      return client.connect({ api_key: 'ak_test_4G6KgDssmWCco5WR2X0N5grJl6rm0t' })
        .then((client: any) => {
          this.instance = client

          return this.instance;
        })
    }

    return this.instance;
  }
}

export default PagarmeClient;