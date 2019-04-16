type manifest = {
  wholeHashIdMap: Js.Dict.t(string),
  wholeDependencyRelationMap: Js.Dict.t(array(AllABType.abRelativePath)),
};