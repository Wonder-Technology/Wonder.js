open StateRenderType;

open BoxGeometryType;

let createRenderState = ({glslSenderRecord, programRecord} as state: StateDataMainType.state) => {
  let {vertices, normals, indices} = RecordBoxGeometryMainService.getRecord(state);
  {glslSenderRecord, programRecord, boxGeometryRecord: {vertices, normals, indices}}
};