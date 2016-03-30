var octreeTool = (function(){
    return {
        createOctree: function(){
            var octreeContainer = wd.GameObject.create();

            var octree = wd.Octree.create();

            octreeContainer.addComponent(octree);

            return octreeContainer;
        }
    }
})();
