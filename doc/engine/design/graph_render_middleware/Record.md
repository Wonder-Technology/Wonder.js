
# desing user api

<!-- not consider gpu cull -->
not consider texture(can use texture array later)
not consider multi-thread, multi-queue
not consider Transparency
not consider dispose
only consider basic, not light

use indirect draw(can draw instance)

first only consider render pipeline; 
second consider compute pipeline + render pipeline;



material bindless:
one ssbo store all materials data(or some ssbo to store camera,light)
so need use ubershader!
need rethink!!!


get objectId, instanceId from indirect buffer for each batch




## design

object pass + move to each batch + cull,sort + draw by batches

baseInstance to get geometry,material data
gl_InstanceIndex to get mvp matrix data


Each batch will be rendered with one DrawIndirect call that does instanced drawing


Each mesh pass (forward pass, shadow pass, others) (jobs) contains an array of batches which it will use for rendering.



all model matrices, all bounding boxes in one ssbo(named ObjectBuffer)

cull design:
we access the object data in the ObjectBuffer using the ObjectID, and check if it is visible.
If it’s visible, we use the BatchID index to insert the draw into the Batches array, which contains the draw indirect calls, increasing the instance count.
We also write it into the indirection buffer that maps from the instance ID of each batch into the ObjectID.




sets indirect draw command->instanceCount to 0 if the object is culled
perf:  so it’s better to compact them somehow, either by using a design that uses instancing (like what we are doing in the tutorial engine), or by using DrawIndirectCount after removing the empty draws.

note: here we can use instanceCount - 1 to skip this instance if it is culled!





With that done, on the CPU side we iterate over the batches in a mesh pass, and execute each of them in order, making sure to bind each batch pipeline and material descriptor set.
The gpu will then use the parameters it just wrote into from the culling pass to render the objects.




RenderScene::build_batches() and RenderScene::merge_meshes() 


## render pipeline

related with pipeline state, shader
so is related with material?





# shader组织

shader reflection

Shader Reflection提供了对我们写在HLSL代码中的Constant Buffer、Shader Resource、Sampler等信息的描述



need get bind group descriptor set, pipeline descriptor set->vertex->buffers location by:
//1. shader reflection
2. user specific


sparate the descriptor set needed data(e.g. shader resource bind data, type) and resource declare, functions, main



bind group set design:
2 sets:
0 for material buffer data;
1 for other data(e.g. geometry, instance);



# GPU资源管理
render graph, ...

资源包括：
bind group/pipeline cache, pipeline, pipeline state, bind group, buffer, renderBundle, pass, encoder?（暴露pass给用户, instead of encoder?）
render target, texture


descriptor set:
create and dispose by pool

//command buffer

pipeline:
<!-- include render states, shader stages, pass data(e.g. colorAttachments) -->
include render states, shader stages

(static)




shader author is responsible for providing well-defined default values for all render states





  - 根据 用户配置，自动生成资源
需要注意平衡，哪些由用户定义，哪些由引擎写死？

用户可指定下面的方面：
更新层级
update 频率 对应 group





# 从cpu传输数据到gpu

问题

如何在每帧中批量修改model model、material data、geometry vertex data数据？



目前已知的传输方式



writeBuffer
persistent map buffer
copy buffer to buffer?





refer to:

https://www.cnblogs.com/chaogex/p/12041286.html#approaching-zero-driver-overhead

[Github] gpuweb/gpuweb#1972

[Github] gpuweb/gpuweb#594

[Github] gpuweb/gpuweb#491

https://www.w3.org/TR/webgpu/#buffer-mapping







实现upload heap？：

一个大的buffer；

使用map/unmap，只使用其中的一部分数据；

需要dynamic array?



需要研究的





研究upload heap



refer to https://www.google.com/search?q=upload+heap&newwindow=1&sxsrf=AOaemvK_jjLZd2LHnlMhfd7KEH42w1keiA:1636451660724&tbas=0&source=lnt&sa=X&ved=2ahUKEwirkLe_gYv0AhWg63MBHfGJD_wQpwV6BAgBECA&biw=1280&bih=646&dpr=1.5



这个应该是d3d12的概念！能用在webgpu中吗？


# vertex buffer