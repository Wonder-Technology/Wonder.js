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

module PassEncoder = {
  module Render = {
    type descriptor
  }
}

type requestAdapter = unit => Js.Promise.t<Adapter.t>

@genType
type webgpu = {requestAdapter: requestAdapter}
