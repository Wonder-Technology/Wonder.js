open MaterialType;

open StateDataType;

let init = (gl, (index, disposedIndexArray), initMaterialFunc, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not dispose any material before init|j},
                ~actual={j|do|j}
              ),
              () => MaterialDisposeComponentCommon.isNotDisposed(disposedIndexArray) |> assertTrue
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  ArraySystem.range(0, index - 1)
  |> ArraySystem.reduceState(
       [@bs] ((state, materialIndex: int) => [@bs] initMaterialFunc(gl, materialIndex, state)),
       state
     )
};

let initMaterial = (materialIndex, gl, initMaterialFunc, state: StateDataType.state) =>
  [@bs] initMaterialFunc(gl, materialIndex, state);