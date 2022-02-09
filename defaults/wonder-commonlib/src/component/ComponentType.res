type index = int

type uid = int

type gameObjectMap = MutableSparseMap.t<index, uid>

type immutableGameObjectMap = ImmutableSparseMap.t<index, uid>

type gameObjectsMap = MutableSparseMap.t<index, array<uid>>
