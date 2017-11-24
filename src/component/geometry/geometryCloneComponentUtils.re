open GeometryType;

open StateDataType;

let handleCloneComponent =
    (mappedSourceComponent: geometry, countRangeArr: array(int), state: StateDataType.state) => {
  let {isClonedMap} = GeometryStateUtils.getGeometryData(state);
  let createFunc =
    if (GeometryJudgeUtils.isBoxGeometry(mappedSourceComponent, state)) {
      BoxGeometryCreateUtils.create
    } else {
      ExceptionHandleSystem.throwMessage({j|unknown geometry:$mappedSourceComponent|j})
    };
  let vertices = GeometryOperateDataUtils.getVertices(mappedSourceComponent, state);
  let indices = GeometryOperateDataUtils.getIndices(mappedSourceComponent, state);
  let componentArr = [||];
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let (state, index) = createFunc(state);
             /* todo optimize compare: set in each loop? */
             let state =
               state
               |> GeometryOperateDataUtils.setVertices(index, vertices)
               |> GeometryOperateDataUtils.setIndices(index, indices);
             /* todo optimize compare: set in another loop? */
             isClonedMap
             |> WonderCommonlib.HashMapSystem.set(Js.Int.toString(index), true)
             |> ignore;
             componentArr |> Js.Array.push(index) |> ignore;
             state
           }
         ),
         state
       );
  (state, componentArr)
};

let isCloned = (mappedGeometryStr, isClonedMap) =>
  isClonedMap |> HashMapSystem.has(mappedGeometryStr);