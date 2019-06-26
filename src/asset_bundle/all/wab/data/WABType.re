type manifest = {
  /* wholeHashIdMap: Js.Dict.t(string),
     wholeDependencyRelationMap: Js.Dict.t(array(AllABType.abRelativePath)), */
  version: string,
  wholeHashIdMap: WonderCommonlib.ImmutableHashMapService.t(string),
  wholeDependencyRelationMap: DependencyDataType.dependencyRelation,
  /* WonderCommonlib.ImmutableHashMapService.t(
       array(AllABType.abRelativePath),
     ), */
};