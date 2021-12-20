let prepare = (given, \"and", componentName, registerdComponentName, getDataFunc, config) => {
  given("prepare register", () => {
    WonderCore.CreatePO.createPO()->WonderCore.POContainer.setPO
  })

  \"and"({j`register ${componentName} data`}, () => {
    WonderCore.Main.registerComponent(getDataFunc()->Obj.magic)
  })

  \"and"("create and set all component states", () => {
    WonderCore.Main.createAndSetComponentState(registerdComponentName, config->Obj.magic)
  })
}
