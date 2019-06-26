open StateRenderType;

open AllProgramType;

open WonderWebgl.GlType;

open WonderWebgl.Gl;

let _use = (gl, program: program, {programRecord} as state) =>
  switch (programRecord.lastUsedProgram) {
  | Some(lastUsedProgram) when program === lastUsedProgram => state
  | _ =>
    programRecord.lastUsedProgram = Some(program);
    useProgram(program, gl);
    /* let state = state |> SendGLSLDataService.disableVertexAttribArray(gl); */
    state;
  };

let useByShaderIndex = (gl, shaderIndex, {programRecord} as state) => {
  let program = AllProgramService.unsafeGetProgram(shaderIndex, programRecord);

  state |> _use(gl, program);
};