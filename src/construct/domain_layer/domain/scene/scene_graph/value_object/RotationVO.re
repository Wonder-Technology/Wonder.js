type t =
  | Rotation(SceneGraphRepoType.rotation);

let create = value => Rotation(value);

let value = rotation =>
  switch (rotation) {
  | Rotation(value) => value
  };

let invert = rotation => rotation->value->Quaternion.invert->create;

let multiply = (rot1, rot2) =>
  Quaternion.multiply(rot1->value, rot2->value)->create;