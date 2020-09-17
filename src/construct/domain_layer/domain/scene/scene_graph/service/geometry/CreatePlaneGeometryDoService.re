let create = () => {
  let vertices = [|
    1.0,
    0.0,
    (-1.0),
    1.0,
    0.0,
    1.0,
    (-1.0),
    0.0,
    1.0,
    (-1.0),
    0.0,
    (-1.0),
  |];
  let normals = [|
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
  |];
  let indices = [|2, 1, 0, 0, 3, 2|];

  CreateDefaultGeometryDoService.create((vertices, normals, indices));
};
