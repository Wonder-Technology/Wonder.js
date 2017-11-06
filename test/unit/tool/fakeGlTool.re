let triangles = 1;

let setFakeGl = (state: StateDataType.state) =>
  Obj.magic({"TRIANGLES": triangles}) |> DeviceManagerSystem.setGL(~state);