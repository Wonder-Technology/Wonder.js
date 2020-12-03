type t = Pipeline(PipelinePOType.pipelineName)

let create = name => Pipeline(name)

let value = pipeline =>
  switch pipeline {
  | Pipeline(name) => name
  }
