type t =
  | Intensity(float);

let create = value => Intensity(value);

let value = intensity =>
  switch (intensity) {
  | Intensity(value) => value
  };
