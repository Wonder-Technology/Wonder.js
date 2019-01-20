
open ProgramType;

let create = () => {
  programMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  lastUsedProgram: None
};