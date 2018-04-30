open GlType;

type programRecord = {
  programMap: WonderCommonlib.SparseMapService.t(program),
  mutable lastUsedProgram: option(program)
};