//TODO should from webpack

export let getStr = {
    handlerForDefault: (api, e) => {
        // let { id, funcStr, stateName, stateValue } = e
        let { funcStr, stateName, stateValue } = e


        let { addExecFunc, removeExecFunc, addState } = api.ui

        // removeExecFunc(id)

        //// TODO check: if id exist, error
        addExecFunc(funcStr)

        /*! if stateName exist, replace it */
        addState(stateName, stateValue)


        // loop()


        // dispatchState(addRegisteredUI(stateValue))

    },
    // handler: (api, e) => {
    //     // let { id, funcStr, stateName, stateValue } = e
    //     let { funcStr, stateName, stateValue } = e


    //     let { addExecFunc, removeExecFunc, addState } = api.ui

    //     // removeExecFunc(id)

    //     //// TODO check: if id exist, error
    //     addExecFunc(funcStr)

    //     /*! if stateName exist, replace it */
    //     addState(stateName, stateValue)


    //     // loop()


    //     // dispatchState(addRegisteredUI(stateValue))
    // }
}