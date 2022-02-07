let exec: RootType.execFunc = states => {
  MostUtils.callFunc(() => {
    Js.log("init root job exec")

    states
  })
}
