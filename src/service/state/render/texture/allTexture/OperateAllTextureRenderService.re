open StateRenderType;

open RenderAllTextureType;

let setActivedTextureUnitIndex = (activedTextureUnitIndex, state) => {
  ...state,
  allTextureRecord: {
    ...state.allTextureRecord,
    activedTextureUnitIndex,
  },
};

let resetActivedTextureUnitIndex = state =>
  setActivedTextureUnitIndex(0, state);

let getActivableTextureUnit = state => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|activableTextureUnitArray should has data|j},
                ~actual={j|not|j},
              ),
              () => {
                let {activableTextureUnitArray} = state.allTextureRecord;

                activableTextureUnitArray |> Js.Array.length > 0;
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let {activableTextureUnitArray, activedTextureUnitIndex} =
    state.allTextureRecord;

  (
    Array.unsafe_get(activableTextureUnitArray, activedTextureUnitIndex),
    activedTextureUnitIndex |> succ,
  )
  |> WonderLog.Contract.ensureCheck(
       ((_, newActivedTextureUnitIndex)) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect=
                     {j|newActivedTextureUnitIndex <= activableTextureUnitArray.length|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 newActivedTextureUnitIndex
                 <= Js.Array.length(activableTextureUnitArray)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
};