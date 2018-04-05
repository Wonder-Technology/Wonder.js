open StateRenderType;

open ProgramType;

open GlType;

open Gl;

let use = (gl, program: program, {programRecord} as state) =>
  switch programRecord.lastUsedProgram {
  | Some(lastUsedProgram) when program === lastUsedProgram => state
  | _ =>
    programRecord.lastUsedProgram = Some(program);
    useProgram(program, gl);
    /* let state = state |> SendGLSLDataService.disableVertexAttribArray(gl); */
    state
  };