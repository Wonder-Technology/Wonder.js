// import { getStr as getRegisterUIStr } from "./ui/registerMenuUI"
// import { getStr as getShowAllRegisteredUIsStr } from "../../../mine/showAllRegisteredMenuUIs"
import { getStr as getRegisterEventHandlerStr } from "./ui/registerEventHandler"
import { getStr as getShowAllEventHandlersStr } from "./ui/showAllRegisteredEventHandlers"
import { getStr as getAddMenuExecFuncStr } from "./event_handler/addMenuExecFunc"
import { getStr as getAddControllerExecFuncStr } from "./event_handler/addControllerExecFunc"
import { getStr as getregisterEventHandler_changeEventNameStr } from "./event_handler/registerEventHandler_changeEventName"
import { getStr as getregisterEventHandler_changeContent } from "./event_handler/registerEventHandler_changeContent"
import { getStr as getregisterEventHandler_submit } from "./event_handler/registerEventHandler_submit"
import { getStr as getshowAllRegisteredEventHandler_changeEventName } from "./event_handler/showAllRegisteredEventHandler_changeEventName"
import { getStr as getshowAllRegisteredEventHandler_changeContent } from "./event_handler/showAllRegisteredEventHandler_changeContent"
import { getStr as getshowAllRegisteredEventHandler_submit } from "./event_handler/showAllRegisteredEventHandler_submit"

type renderEngine = {
	prepare,
	setGameObjectData,
	createAndSetGameObjectState,
	registerWorkPlugin,
	registerComponent,
	createAndSetComponentState
}

type renderEngineForUI = renderEngine

type eventManager = {
	onCustomEvent,
	offCustomEvent,
	triggerCustomEvent
}

type ui = {
	groupStart,
	groupEnd,
	drawTextarea,
	drawButton,
	drawInput,
	dispatchState,
	addState,
	getState,
	useSelector,
	render,
	// markNotRender,
	// markRender
	addExecFunc,
	removeExecFunc,
	setRenderEngine,
}

function _buildUI(): ui {
	//TODO implement
	return {
		dispatchState: (newState) => {
			if (oldState !== newState) {
				/*! only update changed vertices */
				update()
				/*! only render changed group */
				render()
			}
		}
	} as any
}

function _renderAllUIs(): void {
	//TODO implement
	return {} as any
}

// function _markAllUIsNotRender(): void {
// 	//TODO implement
// 	return {} as any
// }

// function _markAllUIsRender(): void {
// 	//TODO implement
// 	return {} as any
// }

function _getRenderEngine(): renderEngine {
	//TODO implement
	return {} as any
}

function _setRenderEngine(): void {
	//TODO implement
	return {} as any
}


function _getEventManager(): eventManager {
	//TODO implement
	return {} as any
}

function _setEventManager(): void {
	//TODO implement
	return {} as any
}



function _getRenderEngineForUI(): renderEngineForUI {
	//TODO implement
	return {} as any
}

function _getMenuUI(): ui {
	//TODO implement
	return {} as any
}

function _setMenuUI(...args): ui {
	//TODO implement
	return {} as any
}

function _getControllerUI(): ui {
	//TODO implement
	return {} as any
}

function _setControllerUI(...args): ui {
	//TODO implement
	return {} as any
}


function _initEngine() {
	let { prepare } = _getRenderEngine()

	prepare()
}

function _createCanvas(): any {
	//TODO implement
	return {} as any
}


enum EventName {
	addMenuExecFunc = "wd_addMenuExecFunc",
	addControllerExecFunc = "wd_addControllerExecFunc"
}


function _buildMenuUIAPI(): any {
	//TODO implement
	return {} as any
}

function _buildControllerUIAPI(): any {
	//TODO implement
	return {} as any
}

function _initEditor() {
	_setRenderEngine()
	_setEventManager()

	/*! only one canvas for whole screen */
	let canvas = _createCanvas()
	_setMenuUI(canvas, _getRenderEngineForUI())
	_setControllerUI(canvas, _getRenderEngineForUI())


	let { onCustomEvent, triggerCustomEvent } = _getEventManager()


	/*! not show and edit default ones for user! */

	/*! on default event */

	// onCustomEvent(EventName.addMenuExecFunc, getAddMenuExecFuncStr.handler)

	onCustomEvent("wd_registerEventHandler_changeEventName", getregisterEventHandler_changeEventNameStr.handler)
	onCustomEvent("wd_registerEventHandler_changeContent", getregisterEventHandler_changeContent.handler)
	onCustomEvent("wd_registerEventHandler_submit", getregisterEventHandler_submit.handler)

	onCustomEvent("wd_showAllRegisteredEventHandler_changeEventName", getshowAllRegisteredEventHandler_changeEventName.handler)
	onCustomEvent("wd_showAllRegisteredEventHandler_changeContent", getshowAllRegisteredEventHandler_changeContent.handler)
	onCustomEvent("wd_showAllRegisteredEventHandler_submit", getshowAllRegisteredEventHandler_submit.handler)


	/*! add default ui */

	// _markAllUIsNotRender()

	getAddMenuExecFuncStr.handlerForDefault(_buildMenuUIAPI(), {
		// id: "m1",
		funcStr: getRegisterEventHandlerStr,
		stateName: "registerEventHandler",
		stateValue: {
			input: {
				// TODO move x,y,width,height to skin
				x: 0,
				y: 0,
				width: 40,
				height: 10,
				value: ""
			},
			textarea: {
				x: 0,
				y: 20,
				width: 20,
				height: 100,
				content: ""
			},
			button: {
				x: 0,
				y: 140,
				width: 20,
				height: 10,
				text: "submit"
			},
		}
	})


	getAddControllerExecFuncStr.handlerForDefault(_buildControllerUIAPI(), {
		funcStr: getShowAllEventHandlersStr,
		stateName: "showAllEventHandlers",
		stateValue: {
			eventHandlerArr: []
		}
	})



	// triggerCustomEvent(EventName.addMenuExecFunc, {
	// 	id: "m1",
	// 	funcStr: getRegisterEventHandlerStr,
	// 	stateName: "registerEventHandler",
	// 	stateValue: {
	// 		input: {
	// 			// TODO move x,y,width,height to skin
	// 			x: 0,
	// 			y: 0,
	// 			width: 40,
	// 			height: 10,
	// 			value: ""
	// 		},
	// 		textarea: {
	// 			x: 0,
	// 			y: 20,
	// 			width: 20,
	// 			height: 100,
	// 			content: ""
	// 		},
	// 		button: {
	// 			x: 0,
	// 			y: 140,
	// 			width: 20,
	// 			height: 10,
	// 			text: "submit"
	// 		},
	// 	}
	// })

	// triggerCustomEvent(EventName.addControllerExecFunc, {
	// 	id: "c1",
	// 	funcStr: getShowAllEventHandlersStr,
	// 	stateName: "showAllEventHandlers",
	// 	stateValue: {
	// 		eventHandlerArr: []
	// 	}
	// })




	// TODO finish registerUI
	// triggerCustomEvent(EventName.addMenuExecFunc, {
	// 	id: "m2",
	// 	funcStr: getRegisterUIStr,
	// 	stateName: "registerUI",
	// 	stateValue: {
	// 		textarea: {
	// 			x: 0,
	// 			y: 0,
	// 			width: 20,
	// 			height: 100,
	// 			content: ""
	// 		},
	// 		button: {
	// 			x: 0,
	// 			y: 120,
	// 			width: 20,
	// 			height: 10,
	// 			text: "submit"
	// 		},
	// 	}
	// })


	// triggerCustomEvent(EventName.addControllerExecFunc, {
	// 	id: "c2",
	// 	funcStr: getShowAllRegisteredUIsStr,
	// 	stateName: "showAllUIs",
	// 	stateValue: {
	// 		uiArr: []
	// 	}
	// })


	// _markAllUIsRender()

	_renderAllUIs()
}

let init = () => {
	_initEngine()
	_initEditor()
}

// let EventManager = {

// }

// let registerEngineComponent = () => {

// }

// let registerEnginePlugin = () => {

// }

// let registerMiddleware = () => {

// }