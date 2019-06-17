
open AllProgramType;

let create = () => {
  programMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  lastUsedProgram: None
};