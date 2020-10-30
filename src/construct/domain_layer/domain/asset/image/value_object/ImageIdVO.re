type t =
  | ImageId(ImageRepoType.id);

let create = value => ImageId(value);

let value = id =>
  switch (id) {
  | ImageId(value) => value
  };
