type t = AlphaCutoff(float)

let create = value => AlphaCutoff(value)

let value = alphaCutoff =>
  switch alphaCutoff {
  | AlphaCutoff(value) => value
  }
