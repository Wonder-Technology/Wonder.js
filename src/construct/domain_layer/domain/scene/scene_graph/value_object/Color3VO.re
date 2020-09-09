type r = float;
type g = float;
type b = float;

type t =
  | Color3(r, g, b);

let create = ((r, g, b)) => Color3(r, g, b);

let value = color =>
  switch (color) {
  | Color3(r, g, b) => (r, g, b)
  };
