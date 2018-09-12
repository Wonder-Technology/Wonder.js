let setRoot = (~width=100, ~height=200, ()) => {
  Root.root##innerWidth#=width;
  Root.root##innerHeight#=height;
  (width, height);
};