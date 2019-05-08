let compute = (radius, bands) => {
  let latitudeBands = bands;
  let longitudeBands = bands;

  let vertices = [||];
  let normals = [||];
  let texCoords = [||];
  let indices = [||];

  for (latNumber in 0 to latitudeBands) {
    let latNumber = latNumber |> NumberType.convertIntToFloat;
    let latitudeBands = latitudeBands |> NumberType.convertIntToFloat;

    let theta = latNumber *. Js.Math._PI /. latitudeBands;
    let sinTheta = Js.Math.sin(theta);
    let cosTheta = Js.Math.cos(theta);

    for (longNumber in 0 to longitudeBands) {
      let longNumber = longNumber |> NumberType.convertIntToFloat;
      let longitudeBands = longitudeBands |> NumberType.convertIntToFloat;

      let phi = longNumber *. 2. *. Js.Math._PI /. longitudeBands;
      let sinPhi = Js.Math.sin(phi);
      let cosPhi = Js.Math.cos(phi);

      let x = radius *. cosPhi *. sinTheta;
      let y = radius *. cosTheta;
      let z = radius *. sinPhi *. sinTheta;
      let u = 1. -. longNumber /. longitudeBands;
      let v = 1. -. latNumber /. latitudeBands;

      vertices
      |> ArrayService.push(x)
      |> ArrayService.push(y)
      |> ArrayService.push(z)
      |> ignore;

      normals
      |> ArrayService.push(x)
      |> ArrayService.push(y)
      |> ArrayService.push(z)
      |> ignore;

      texCoords |> ArrayService.push(u) |> ArrayService.push(v) |> ignore;
    };
  };

  for (latNumber in 0 to latitudeBands - 1) {
    for (longNumber in 0 to longitudeBands - 1) {
      let first = latNumber * (longitudeBands + 1) + longNumber;
      let second = first + longitudeBands + 1;

      indices
      |> ArrayService.push(first + 1)
      |> ArrayService.push(second)
      |> ArrayService.push(first)
      |> ArrayService.push(first + 1)
      |> ArrayService.push(second + 1)
      |> ArrayService.push(second)
      |> ignore;
    };
  };

  (vertices, texCoords, normals, indices);
};