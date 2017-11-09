let getShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialSystem.getShaderIndex(Js.Int.toString(materialIndex), state);