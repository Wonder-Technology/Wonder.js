module Adapter = {
  type t
}

module Buffer = {
  type t
}

module BindGroupLayout = {
  type t
}

module BindGroup = {
  type t
}

module RenderBundle = {
  type t
}

type requestAdapter = unit => Js.Promise.t<Adapter.t>

type webgpu = {requestAdapter: requestAdapter}
