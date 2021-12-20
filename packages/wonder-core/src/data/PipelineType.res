type link = [#merge | #concat]

type elementType = [#job | #group]

type elementName = string

type element = {
  name: elementName,
  type_: elementType,
}

type groupName = string

type group = {
  name: groupName,
  link: link,
  elements: array<element>,
}

type groups = array<group>

type pipelineName = string

@genType
type pipelineData = {
  name: pipelineName,
  groups: groups,
  first_group: groupName,
}
