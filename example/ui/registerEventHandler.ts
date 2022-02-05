//TODO should from webpack
export let getStr = {
    execFunc: (api, state) => {
        let { useSelector, groupStart, groupEnd, drawInput, drawTextarea, drawButton } = api.ui
        let { triggetCustomEvent } = api.eventManager

        let { input, textarea, button } = useSelector(state.registerEventHandler)

        groupStart({
            x:0,
            y:0,
            width:40,
            height:150
        })

        //TODO change params to object(e.g. {x:input.x, ...})
        drawInput(input.x, input.y, input.width, input.height,
            input.value,
            onChange = (e) => triggetCustomEvent("wd_registerEventHandler_changeEventName", e.value))

        drawTextarea(textarea.x, textarea.y, textarea.width, textarea.height,
            textarea.content,
            onChange = (e) => triggetCustomEvent("wd_registerEventHandler_changeContent", e.content))

        drawButton(button.x, button.y, button.width, button.height, button.text,
            onClick = (e) => triggetCustomEvent("wd_registerEventHandler_submit", {
                eventName: input.value,
                content: textarea.content
            })
        )

        groupEnd()
    }
}