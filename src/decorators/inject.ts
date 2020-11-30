import Container from "../singletons/container"

export function Inject(name: string): (target: any,  targetName: string) => void{
  return function(target: any, targetName: string) {
    Object.defineProperty(target, targetName, {
      get: () => Container.instance.resolve(name)
    })
  }
}