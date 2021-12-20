import { execFunc as execFuncCore } from "wonder-core/src/abstract/work/IWorkForJs.gen"

export type state = {
    data1: number
}

export type config = void

export type states = { "wonder-work-plugin-test1": state }

export type execFunc = execFuncCore<states>

// export type callFunc = 