//TODO should from webpack
export let getStr = {
    handler: (api, e) => {
        let value = e


        // let { dispatchState, getState } = api.ui
        // let stateName = "registerEventHandler"
        // let state = getState(stateName)



        //should update registerEventHandler if it's visible

        // dispatchState(stateName, {
        //     ...state,
        //     input: {
        //         ...state.input,
        //         value: value
        //     }
        // })


        let { dispatchState } = api.ui

        // TODO add action, reducer
        dispatchState(changeEventName(value))
    }
}