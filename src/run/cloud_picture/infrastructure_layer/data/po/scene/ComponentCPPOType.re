type index = int;

type uid = int;

type gameObjectMap = ImmutableSparseMap.t(index, uid);

type gameObjectsMap = ImmutableSparseMap.t(index, list(uid));
