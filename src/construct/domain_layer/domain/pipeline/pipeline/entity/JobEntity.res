type t = Job(PipelinePOType.jobName)

let create = name => Job(name)

let value = job =>
  switch job {
  | Job(name) => name
  }
