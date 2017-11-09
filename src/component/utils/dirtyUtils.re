let convertDirtyListToDirtyMap = (dirtyList:array(int)) => {
  let newDirtyMap = HashMapSystem.createEmpty();
  dirtyList
  |> Js.Array.forEach(
       (dirtyTransformIndex: int) =>
         newDirtyMap |> HashMapSystem.set(Js.Int.toString(dirtyTransformIndex), true) |> ignore
     );
  /* |> ignore; */
  newDirtyMap;
};
