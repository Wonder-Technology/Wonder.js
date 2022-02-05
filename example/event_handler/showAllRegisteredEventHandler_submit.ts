//TODO should from webpack
export let getStr = {
    handler: (api, e) => {
        let { eventName, content, id } = e

        let { onCustomEvent, offCustomEvent } = api.eventManager

        offCustomEvent(eventName, getHandler(id))
        // TODO handle order
        onCustomEvent(eventName, content.handler)



        let { dispatchState } = api.ui

        /*! should update state.showAllEventHandlers */
        dispatchState(submit(eventName, content))
    }
}