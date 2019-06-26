open WonderWebgl.GlType;

type programRecord = {
  programMap: WonderCommonlib.MutableSparseMapService.t(program),
  mutable lastUsedProgram: option(program)
};