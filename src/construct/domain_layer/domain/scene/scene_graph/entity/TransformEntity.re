type t =
  | Transform(SceneGraphRepoType.transform);

let create = value => Transform(value);

let value = transform =>
  switch (transform) {
  | Transform(value) => value
  };

// let isSame = (tran1, tran2) => value(tran1) === value(tran2);
