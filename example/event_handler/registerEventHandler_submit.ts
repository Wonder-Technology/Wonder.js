//TODO should from webpack

function _getHandler() {
    //TODO implement
    return {} as any
}

function _setHandler() {
    //TODO implement
    return {} as any
}

export let getStr = {
    handler: (api, e) => {
        let { eventName, content } = e

        let { onCustomEvent } = api.eventManager

        // TODO handle order
        onCustomEvent(eventName, content.handler)



        let { dispatchState } = api.ui

        /*! should update state.showAllEventHandlers */
        dispatchState(submit(eventName, content))
    }
}