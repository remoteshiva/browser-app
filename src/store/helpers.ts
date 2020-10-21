export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(type: T, payload: P): { type: T; payload: P }
export function typedAction(type: string, payload?: any) {
  return { type, payload }
}

type BackendObject = {
  id: string
}

export function arrayToObject<T extends BackendObject>(array: T[]) {
  return array.reduce((obj: { [key: string]: T }, item: T) => {
    obj[item.id] = item
    return obj
  }, {})
}

export function arrayToMap<K extends unknown, T extends BackendObject>(array: T[]) {
  const map = new Map<K, T>()
  array.forEach(item => map.set(item.id as K, item))
  return map
}
