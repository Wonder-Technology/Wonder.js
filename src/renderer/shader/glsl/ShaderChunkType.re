type glslChunk = {
  mutable top: string,
  mutable define: string,
  mutable varDeclare: string,
  mutable funcDeclare: string,
  mutable funcDefine: string,
  mutable body: string
};

type glslChunkData = {chunkMap: Js.Dict.t(glslChunk)};