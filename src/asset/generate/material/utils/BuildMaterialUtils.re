let isDefaultColor = color => color == [|1., 1., 1.|];

let buildColorFactor = color =>
  isDefaultColor(color) ? None : Some(Js.Array.concat([|1.|], color));