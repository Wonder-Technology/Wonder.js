//TODO should from webpack
export let getStr = {
    handler: (api, e) => {
        let value = e


        let { dispatchState } = api.ui

        // TODO add action, reducer
        dispatchState(changeEventName(value))
    }
}