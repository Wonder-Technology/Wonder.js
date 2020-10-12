type t =
  | IOR(float);

let create = value => IOR(value);

let value = ior =>
  switch (ior) {
  | IOR(value) => value
  };
