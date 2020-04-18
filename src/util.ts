export const zip = <X, Y>(xs: Array<X>, ys: Array<Y>): Array<[X, Y]> =>
  xs.slice(0, ys.length).map((x, i) => [x, ys[i]])

export const pairwise = <X>(xs: Array<X>): Array<[X, X]> => zip(xs, xs.slice(1))
