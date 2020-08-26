type t =
  | EulerAngles(TransformPOType.eulerAngles);

let create = value => EulerAngles(value);

let value = eulerAngles =>
  switch (eulerAngles) {
  | EulerAngles(value) => value
  };
