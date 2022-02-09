InitEventJob = {
  let exec = states => {
    MostUtils.callFunc(() => {
      onCustomEvent("mousedown", () => {
        trigger("wd_pointdown", data)
      })

      states
    })
  }
}

Main = {
  init({
    onCustomEvent("wd_pointdown", update state -> io -> pointdown)


let editorUIState = editorUIState -> UI.registerSkin(
  "WD_Button_Skin",
  // TODO stateValue should in the same way!

  // TODO change str to single field(for extend data, like stateValue, skin, script attribute)!
  // add a middleware to do this!!!

  {
    buttonColor: [0.35, 0.1, 0.1],
  }
)

let editorUIState =
  editorUIState -> UI.registerCustomControl(
    "WD_Button",
    (state, rect, str, skinName, api, { onClick }) => {
      let { buttonColor } = api.getSkin(skinName)
      let(isButtonClick, (imageId, color)) = judge(rect, buttonColor, state)

      let state = api.drawBox(rect, state)
      let state = api.drawText(str, state)

      let state = isButtonClick ? onClick({
        pointDown: state.io.pointDown
      }, state) : state

      state
    }
  )

RegisterManager.register = {
  let editorUIState = editorUIState -> UI.addExecFuncData((state, api) => {
    let buttonFunc = api.unsafeGetCustomControl("WD_Button")
    let { rect, str } as uiState = get()

    buttonFunc(state, rect, str, "WD_Button_Skin", api, {
      onClick: (e) => {
        // ...
      }
    })
  })
}


    })

loop({
  let editorUIState = UI.render({
    state.io.pointdown
  })


})


}
