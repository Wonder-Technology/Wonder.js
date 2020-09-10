type t =
  | Aspect(float);

let create = value => Aspect(value);

let value = aspect =>
  switch (aspect) {
  | Aspect(value) => value
  };