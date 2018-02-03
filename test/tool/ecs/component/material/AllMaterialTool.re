/* let isMaterial = (material) => {
     open Wonder_jest;
     open Expect;
     open! Expect.Operators;
     expect(material) >= 0
   }; */
let pregetGLSLData = (state) =>
  state |> PregetGLSLDataJob.execJob(1 |> Obj.magic, [@bs] DeviceManagerSystem.unsafeGetGl(state));

let prepareForInit = (state) => state |> pregetGLSLData;