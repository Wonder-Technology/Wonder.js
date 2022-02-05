//TODO should from webpack

export let getStr = {
    handlerForDefault: (api, e) => {
        let { funcStr, stateName, stateValue } = e


        let { addExecFunc, addState } = api.ui

        addExecFunc(funcStr)

        addState(stateName, stateValue)
    },
    handler: (api, e) => {
    }
}