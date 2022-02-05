//TODO should from webpack
export let getStr = {
    handler: (api, e) => {
        let content = e


        let { dispatchState } = api.ui
        // let stateName = "registerEventHandler"
        // let state = getState(stateName)

        dispatchState(changeContent(content))
    }
}