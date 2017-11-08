open GlType;

type programData = {programMap: Js.Dict.t(program), mutable lastUsedProgram: option(program)};