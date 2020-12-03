type link =
  | Merge
  | Concat

type elementType =
  | Job
  | Group

type elementName = string

type element = {
  name: elementName,
  type_: elementType,
}

type groupName = string

type group = {
  name: groupName,
  link: link,
  elements: list<element>,
}

type pipelineName = string

type pipelineData = {
  name: pipelineName,
  groups: list<group>,
  firstGroup: groupName,
}

type execFunc = unit => WonderBsMost.Most.stream<Result.t2<unit>>

type pipelineStream = WonderBsMost.Most.stream<Result.t2<unit>>
