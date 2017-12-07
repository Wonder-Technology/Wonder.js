open ComponentType;

type sourceInstance = int;

type objectInstanceListMap = array(array(int));

type sourceInstanceData = {
  mutable index: int,
  objectInstanceListMap,
  gameObjectMap
};