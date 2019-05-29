open WonderBsMost;

module TestWithOneSAB = {
  let assemble = data: Most.stream(GameObjectPrimitiveType.gameObject) => {
    let newSab1 = GenerateAllABTool.TestWithOneSAB.getNewSAB(data);

    let sab1RelativePath =
      GenerateAllABTool.TestWithOneSAB.getSABRelativePath();

    let wholeDependencyRelationMap =
      GenerateAllABTool.TestWithOneSAB.getWholeDependencyRelationMap(
        sab1RelativePath,
      );

    AssembleABSystem.SAB.assemble(
      sab1RelativePath,
      newSab1,
      wholeDependencyRelationMap,
    )
    |> Obj.magic;
  };
};

module TestWithOneSABAndOneRAB = {
  let assemble = data: Most.stream(GameObjectPrimitiveType.gameObject) => {
    let (newRab1, newSab1) =
      GenerateAllABTool.TestWithOneSABAndOneRAB.getNewABs(data);

    let (rab1RelativePath, sab1RelativePath) =
      GenerateAllABTool.TestWithOneSABAndOneRAB.getABRelativePaths();

    let wholeDependencyRelationMap =
      GenerateAllABTool.TestWithOneSABAndOneRAB.getWholeDependencyRelationMap(
        rab1RelativePath,
        sab1RelativePath,
      );

    MostUtils.concatExecStreamArr([|
      (.) =>
        AssembleABSystem.RAB.assemble(
          rab1RelativePath,
          newRab1,
          wholeDependencyRelationMap,
        ),
      (.) =>
        AssembleABSystem.SAB.assemble(
          sab1RelativePath,
          newSab1,
          wholeDependencyRelationMap,
        )
        |> Obj.magic,
    |])
    |> Obj.magic;
  };
};