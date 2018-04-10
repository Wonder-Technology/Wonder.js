let commit = (gl) => {
  WonderLog.Log.print("commit gl") |> ignore;
  Gl.commit(gl)
};