open StateDataMainType;

open EventType;

/* TODO change job to stream job? */
let execJob = (_, state) => InitEventJobUtils.initEvent(state);