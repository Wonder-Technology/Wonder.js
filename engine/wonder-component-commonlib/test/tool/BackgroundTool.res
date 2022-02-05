let prepare = (given, \"and", componentName, registerdComponentName, getDataFunc, config) => {
  given("prepare register", () => {
    WonderEngineCore.CreatePO.createPO()->WonderEngineCore.POContainer.setPO
  })

  \"and"({j`register ${componentName} data`}, () => {
    WonderEngineCore.Main.registerComponent(getDataFunc()->Obj.magic)
  })

  \"and"("create and set all component states", () => {
    WonderEngineCore.Main.createAndSetComponentState(registerdComponentName, config->Obj.magic)
  })
}
