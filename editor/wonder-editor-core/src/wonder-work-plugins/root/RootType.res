type state = unit

type config = unit

type states = {"wonder-work-plugin-root": state}

type execFunc = WonderEngineCore.IWorkForJs.execFunc<states>
