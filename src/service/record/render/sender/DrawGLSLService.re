open WonderWebgl.Gl;

let drawElement = ((drawMode: int, type_: int, typeSize: int, indicesCount: int), gl) => {
  let startOffset = 0;
  drawElements(drawMode, indicesCount, type_, typeSize * startOffset, gl);
  ()
};

let drawArray = (drawMode: int, verticesCount: int, gl) => {
  let startOffset = 0;
  drawArray(drawMode, startOffset, verticesCount, gl);
  ()
};

let drawElementsInstancedANGLE =
    ((drawMode, type_, typeSize: int, indicesCount: int, instancesCount), extension) => {
  let startOffset = 0;
  [@bs]
  extension##drawElementsInstancedANGLE(
    drawMode,
    indicesCount,
    type_,
    typeSize * startOffset,
    instancesCount
  )
  |> ignore
};