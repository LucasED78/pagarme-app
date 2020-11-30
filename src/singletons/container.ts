class Container {
  private providers: { [key: string]: any } = {};

  private static _instance: Container;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  resolve = (key: string): any => {
    const hasMatcher = Object.keys(this.providers).filter(provider => {
      return provider === key
    })

    if (hasMatcher) {
      return this.providers[key];
    }

    throw new Error(`Container has not registered the ${key}`)
  }

  register = (key: string, value: any): void =>  this.providers[key] = value

  static get instance(): Container {
    if (!Container._instance) {
      Container._instance = new Container();

      return Container._instance;
    }

    return Container._instance;
  }
}

export default Container;