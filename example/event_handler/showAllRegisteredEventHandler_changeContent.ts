//TODO should from webpack
export let getStr = {
    handler: (api, e) => {
        let content = e


        let { dispatchState } = api.ui

        dispatchState(changeContent(content))
    }
}