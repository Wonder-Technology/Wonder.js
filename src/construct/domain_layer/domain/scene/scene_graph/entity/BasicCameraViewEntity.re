type t =
  | BasicCameraView(BasicCameraViewPOType.basicCameraView);

let create = index => BasicCameraView(index);

let value = basicCameraView =>
  switch (basicCameraView) {
  | BasicCameraView(index) => index
  };
