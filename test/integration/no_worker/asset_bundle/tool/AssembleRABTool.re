/* let assemble */

module TestWithOneRAB = {
  let assemble = data => {
    let newRab1 = GenerateAllABTool.TestWithOneRAB.getNewRab(data);

    let rab1RelativePath =
      GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

    let wholeDependencyRelationMap =
      GenerateAllABTool.TestWithOneRAB.getWholeDependencyRelationMap();

    AssembleABSystem.RAB.assemble(
      rab1RelativePath,
      newRab1,
      wholeDependencyRelationMap,
    );
  };
};

module TestWithTwoRABs = {
  let assemble = data => {
    let (newRab1, newRab2) =
      GenerateAllABTool.TestWithTwoRAB.getNewRabs(data);

    let (rab1RelativePath, rab2RelativePath) =
      GenerateAllABTool.TestWithTwoRAB.getRabRelativePaths();

    let wholeDependencyRelationMap =
      GenerateAllABTool.TestWithTwoRAB.getWholeDependencyRelationMap(
        rab1RelativePath,
        rab2RelativePath,
      );

    MostUtils.concatExecStreamArr([|
      (.) =>
        AssembleABSystem.RAB.assemble(
          rab1RelativePath,
          newRab1,
          wholeDependencyRelationMap,
        ),
      (.) =>
        AssembleABSystem.RAB.assemble(
          rab2RelativePath,
          newRab2,
          wholeDependencyRelationMap,
        ),
    |]);
  };
};