from metaData import *

class AssetParser(object):
    def __init__(self):
        pass

    def parse(self, scene, output):
        output["asset"] = {
            "version": version,
            "generator": generator
        }

        self._addCopyright(output, scene)

    def _addCopyright(self, output, scene):
        info = scene.GetSceneInfo()
        author = info.mAuthor

        if author and author != "":
            output["copyright"] = "author:%s" % author
