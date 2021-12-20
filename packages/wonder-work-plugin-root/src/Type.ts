import { execFunc as execFuncCore } from "wonder-core/src/abstract/work/IWorkForJs.gen"

export type state = {
}

export type config = void

export type states = { "wonder-work-plugin-root": state }

export type execFunc = execFuncCore<states>

// export type callFunc = 