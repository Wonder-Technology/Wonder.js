//TODO should from webpack
export let getStr = {
    execFunc: (api, state) => {
        let { useSelector, groupStart, groupEnd, drawInput, drawTextarea, drawButton } = api.ui
        let { triggetCustomEvent } = api.eventManager

        let { eventHandlerArr } = useSelector(state.showAllRegisteredEventHandlers)


        groupStart({
            x: 0,
            y: 0,
            width: 40,
            height: 150
        })

        eventHandlerArr.forEach(eventHandler => {
            let { id, input, textarea, button } = eventHandler

            drawInput(input.x, input.y, input.width, input.height,
                input.value,
                onChange = (e) => triggetCustomEvent("wd_showAllRegisteredEventHandlers_changeEvent", e.value))

            drawTextarea(textarea.x, textarea.y, textarea.width, textarea.height,
                textarea.content,
                onChange = (e) => triggetCustomEvent("wd_showAllRegisteredEventHandlers_changeContent", e.content))

            drawButton(button.x, button.y, button.width, button.height, button.text,
                onClick = (e) => triggetCustomEvent("wd_showAllRegisteredEventHandlers_submit", textarea.content)
            )
        })

        groupEnd()
    }
}