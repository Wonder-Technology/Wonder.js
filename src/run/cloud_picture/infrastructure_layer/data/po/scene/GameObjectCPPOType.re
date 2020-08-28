type uid = int;

type componentIndex = int;

type gameObject = {
  maxUID: uid,
  transformMap: ImmutableSparseMap.t(uid, componentIndex),
};
