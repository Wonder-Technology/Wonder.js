// TODO remove duplicate with wgslmanager

type attributeName = string

type attributeFormat = [#float32x3]

type attributeLocationData = {
  location: int,
  offset: int,
  type_: attributeFormat,
}

type vertexBufferArrayStride = int

type bindGroupSet = int

type visibility = [#vertex | #framgent]

type bufferBindingType = [#uniform | #storage | #"read-only-storage"]

type buffer = {type_: bufferBindingType}

type bindGroupLayoutData = {
  binding: int,
  visibility: visibility,
  buffer: option<buffer>,
}

type shaderData = {
  vertexWGSL: string,
  fragmentWGSL: string,
  vertexBufferArrayStride: vertexBufferArrayStride,
  allVertexAttributeData: array<(attributeName, attributeLocationData)>,
  allBindGroupLayoutData: array<(bindGroupSet, bindGroupLayoutData)>,
}