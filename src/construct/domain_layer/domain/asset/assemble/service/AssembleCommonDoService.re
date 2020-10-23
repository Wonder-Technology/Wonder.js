let addChildrenToParent = (parent, children) =>
  children
  ->ListSt.traverseResultM(child => {
      HierachyTransformDoService.setParent(parent, child)
    })
  ->ListSt.ignoreTraverseResultValue;
