import { Reducer } from 'react'

export const zip = <X, Y>(xs: Array<X>, ys: Array<Y>): Array<[X, Y]> =>
  xs.slice(0, ys.length).map((x, i) => [x, ys[i]])

export const pairwise = <X>(xs: Array<X>): Array<[X, X]> => zip(xs, xs.slice(1))

export type Msg<K, P = undefined> = P extends undefined
  ? { type: K }
  : {
      type: K
      payload: P
    }

export type Updater<S, A> = (state: S, action: A) => Partial<S>

export const asReducer = <S, A>(update: Updater<S, A>): Reducer<S, A> => (
  state,
  action
) => ({ ...state, ...update(state, action) })
