open GlType;

type programRecord = {
  programMap: array(program),
  mutable lastUsedProgram: option(program)
};