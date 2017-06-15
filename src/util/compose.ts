import { noop } from './noop';

export interface UnaryFunction<T, R> {
  (input: T): R;
}

export function compose<T, R>(...fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R> {
  if (!fns) {
    return noop as UnaryFunction<any, any>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function composed(input: T): R {
    return fns.reduce((prev: any, fn: UnaryFunction<T, R>) => fn(prev), input);
  };
}
