open TransformStateUtils;

open TransformType;

open ComponentSystem;

open Contract;

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getTransformData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  (state, index)
  |> ensureCheck(
       ((state, _)) => {
         open Contract.Operators;
         let {index}: transformData = getTransformData(state);
         let maxCount = TransformBufferUtils.getMaxCount(state);
         test(
           {j|have create too many components(the count of transforms shouldn't exceed $maxCount)|j},
           () => index <= maxCount
         )
       }
     )
};