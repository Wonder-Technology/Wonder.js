module RAB = {
  let getAllNeededABCount = (abRelativePath, wabRelativePath, state) =>
    (
      FindDependencyDataSystem.findAllDependencyRABRelativePathByDepthSearch(
        abRelativePath,
        OperateWABAssetBundleMainService.unsafeGetWholeDependencyRelationMap(
          wabRelativePath,
          state,
        ),
      )
      |> Js.Array.length
    )
    + 1;

  let _getLoadedDependencyRABCount = (abRelativePath, wabRelativePath, state) =>
    FindDependencyDataSystem.findAllDependencyRABRelativePathByDepthSearch(
      abRelativePath,
      OperateWABAssetBundleMainService.unsafeGetWholeDependencyRelationMap(
        wabRelativePath,
        state,
      ),
    )
    |> Js.Array.filter(rabRelativePath =>
         OperateRABAssetBundleMainService.isLoaded(rabRelativePath, state)
       )
    |> Js.Array.length;

  let _getLoadedSABCount = (abRelativePath, state) =>
    JudgeABTypeUtils.isSAB(abRelativePath) ?
      OperateSABAssetBundleMainService.isLoaded(abRelativePath, state) ?
        1 : 0 :
      JudgeABTypeUtils.isRAB(abRelativePath) ?
        OperateRABAssetBundleMainService.isLoaded(abRelativePath, state) ?
          1 : 0 :
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="getLoadedNeededABCount",
            ~description={j|unknown abRelativePath: $abRelativePath|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        );

  let getLoadedNeededABCount = (abRelativePath, wabRelativePath, state) =>
    _getLoadedDependencyRABCount(abRelativePath, wabRelativePath, state)
    + _getLoadedSABCount(abRelativePath, state);
};