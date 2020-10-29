type t =
  | Transform(SceneGraphType.transform);

let create = index => Transform(index);

let value = transform =>
  switch (transform) {
  | Transform(index) => index
  };

// let isSame = (tran1, tran2) => value(tran1) === value(tran2);
