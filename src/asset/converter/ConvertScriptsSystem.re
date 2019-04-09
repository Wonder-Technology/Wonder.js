let convertToScripts = ({extras}: GLTFType.gltf) =>
  switch (extras) {
  | None => [||]
  | Some({scripts}) =>
    switch (scripts) {
    | None => [||]
    | Some(scripts) => scripts
    }
  };