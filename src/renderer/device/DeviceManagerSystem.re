open StateData;

open ViewSystem;

open Gl;

let setGL (gl: webgl1Context) state::(state: state) => {...state, deviceManagerData: {gl: gl}};

let createGL (state: state) => getContext (getCanvas state) (getContextConfig state);