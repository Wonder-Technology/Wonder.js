module RAB = {
  let getAllDependencyRABCount = (abRelativePath, wabRelativePath, state) =>
    FindDependencyDataSystem.findAllDependencyRAbRelativePath(
      abRelativePath,
      OperateWABAssetBundleMainService.unsafeGetWholeDependencyRelationMap(
        wabRelativePath,
        state,
      ),
    )
    |> Js.Array.length;

  let getLoadedDependencyRABCount = (abRelativePath, wabRelativePath, state) =>
    FindDependencyDataSystem.findAllDependencyRAbRelativePath(
      abRelativePath,
      OperateWABAssetBundleMainService.unsafeGetWholeDependencyRelationMap(
        wabRelativePath,
        state,
      ),
    )
    |> Js.Array.filter(rabRelativePath =>
         OperateRABAssetBundleMainService.isAssembled(rabRelativePath, state)
       )
    |> Js.Array.length;
};