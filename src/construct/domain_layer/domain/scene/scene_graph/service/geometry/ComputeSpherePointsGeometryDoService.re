let compute = (radius, bands) => {
  let latitudeBands = bands;
  let longitudeBands = bands;

  let vertices = [||];
  let normals = [||];
  let texCoords = [||];
  let indices = [||];

  for (latNumber in 0 to latitudeBands) {
    let latNumber = latNumber->Belt.Float.fromInt;
    let latitudeBands = latitudeBands->Belt.Float.fromInt;

    let theta = latNumber *. Js.Math._PI /. latitudeBands;
    let sinTheta = Js.Math.sin(theta);
    let cosTheta = Js.Math.cos(theta);

    for (longNumber in 0 to longitudeBands) {
      let longNumber = longNumber->Belt.Float.fromInt;
      let longitudeBands = longitudeBands->Belt.Float.fromInt;

      let phi = longNumber *. 2. *. Js.Math._PI /. longitudeBands;
      let sinPhi = Js.Math.sin(phi);
      let cosPhi = Js.Math.cos(phi);

      let x = radius *. cosPhi *. sinTheta;
      let y = radius *. cosTheta;
      let z = radius *. sinPhi *. sinTheta;
      let u = 1. -. longNumber /. longitudeBands;
      let v = 1. -. latNumber /. latitudeBands;

      vertices->ArraySt.push(x)->ArraySt.push(y)->ArraySt.push(z)->ignore;

      normals->ArraySt.push(x)->ArraySt.push(y)->ArraySt.push(z)->ignore;
    };
  };

  for (latNumber in 0 to latitudeBands - 1) {
    for (longNumber in 0 to longitudeBands - 1) {
      let first = latNumber * (longitudeBands + 1) + longNumber;
      let second = first + longitudeBands + 1;

      indices
      ->ArraySt.push(first + 1)
      ->ArraySt.push(second)
      ->ArraySt.push(first)
      ->ArraySt.push(first + 1)
      ->ArraySt.push(second + 1)
      ->ArraySt.push(second)
      ->ignore;
    };
  };

  (vertices, normals, indices);
};
