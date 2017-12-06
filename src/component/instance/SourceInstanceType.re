open ComponentType;

type sourceInstance = int;

type objectInstanceList = array(int);

type sourceInstanceData = {
  mutable index: int,
  objectInstanceList,
  gameObjectMap
};