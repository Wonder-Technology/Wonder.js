let conjugate = ((x, y, z, w)) => (
  x *. (-1.0),
  y *. (-1.0),
  z *. (-1.0),
  w,
);

let length = ((x, y, z, w)) =>
  Js.Math.sqrt(x *. x +. y *. y +. z *. z +. w *. w);

let normalize = ((x, y, z, w) as tuple) => {
  let len = length(tuple);
  switch (len) {
  | 0. => (0., 0., 0., 1.)
  | len => (x /. len, y /. len, z /. len, w /. len)
  };
};

let invert = tuple => conjugate(tuple) |> normalize;

let multiply = ((q1x, q1y, q1z, q1w), (q2x, q2y, q2z, q2w)) => (
  q1w *. q2x +. q1x *. q2w +. q1y *. q2z -. q1z *. q2y,
  q1w *. q2y +. q1y *. q2w +. q1z *. q2x -. q1x *. q2z,
  q1w *. q2z +. q1z *. q2w +. q1x *. q2y -. q1y *. q2x,
  q1w *. q2w -. q1x *. q2x -. q1y *. q2y -. q1z *. q2z,
);