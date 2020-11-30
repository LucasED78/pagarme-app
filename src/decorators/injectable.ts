/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "../singletons/container";

export function Injectable(key: string): (value: any) => void {
  return function(value: any) {
    Container.instance.register(key, new value());
  }
}