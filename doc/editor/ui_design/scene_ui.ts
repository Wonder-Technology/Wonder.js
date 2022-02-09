Main = {
    let editorUIState = editorUIState -> UI.setCanvas(canvas)
let sceneUIState = sceneUIState -> UI.setCanvas(canvas)

    RegisterManager.register = {
        let editorUIState = editorUIState -> UI.addExecFuncData((state, api) => {
        })
    }


    RegisterManager.register = {
        let sceneUIState = sceneUIState -> UI.addExecFuncData((state, api) => {
        })
    }


loop({
        let editorUIState = UI.render({
            state.io.pointdown
        })
        let sceneUIState = UI.render({
            state.io.pointdown
        })
    })
}