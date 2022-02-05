import { keyboardEvent, mouseEvent, touchEvent, customEvent } from "./data/EventType.gen"
import { browser } from "./data/BrowserType.gen"

type po = any

export function preparePO(): void

type func<Event, T = po> =
  (event: Event, po: T) => T

type handleFunc<Event, T = po> = (
  domEventName: string,
  priority: number,
  func: func<T, Event>
) => void

export function onMouseEvent(eventName: string, priority: number, handleFunc: handleFunc<mouseEvent>): void

export function onKeyboardEvent(eventName: string, priority: number, handleFunc: handleFunc<keyboardEvent>): void

export function onTouchEvent(eventName: string, priority: number, handleFunc: handleFunc<touchEvent>): void

export function offMouseEventByHandleFunc(eventName: string, handleFunc: handleFunc<mouseEvent>): void

export function offKeyboardEventByHandleFunc(eventName: string, handleFunc: handleFunc<keyboardEvent>): void

export function offTouchEventByHandleFunc(eventName: string, handleFunc: handleFunc<touchEvent>): void

type customEventHandleFunc<T = po> =
  (customEvent: customEvent, po: T) => [T, customEvent]

export function onCustomGlobalEvent(eventName: string, priority: number, handleFunc: customEventHandleFunc): void

export function offCustomGlobalEventByEventName(eventName: string): void

export function offCustomGlobalEventByHandleFunc(eventName: string, handleFunc: customEventHandleFunc): void

export function stopPropagationCustomEvent(customEvent: customEvent): customEvent

export function triggerCustomGlobalEvent(customEvent: customEvent): void

type userData = any;

export function createCustomEvent(eventName: string, userData?: userData): customEvent

export function getPointDownEventName(): string

export function getPointUpEventName(): string

export function getPointTapEventName(): string

export function getPointMoveEventName(): string

export function getPointScaleEventName(): string

export function getPointDragStartEventName(): string

export function getPointDragOverEventName(): string

export function getPointDragDropEventName(): string

export function initEvent(): void

export function setCanvas(canvas: HTMLCanvasElement): void

export function getBody(): HTMLBodyElement

export function setBody(body: HTMLBodyElement): void

export function setBrowser(browser: browser): void

export function getBrowserChromeType(): browser

export function getBrowserFirefoxType(): browser

export function getBrowserAndroidType(): browser

export function getBrowserIOSType(): browser

export function getBrowserUnknownType(): browser