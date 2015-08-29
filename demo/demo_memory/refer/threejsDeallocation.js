// Events

var onObjectRemoved = function ( event ) {

    var object = event.target;

    object.traverse( function ( child ) {

        child.removeEventListener( 'remove', onObjectRemoved );

        removeObject( child );

    } );

};

var onGeometryDispose = function ( event ) {

    var geometry = event.target;

    geometry.removeEventListener( 'dispose', onGeometryDispose );

    deallocateGeometry( geometry );

};

var onTextureDispose = function ( event ) {

    var texture = event.target;

    texture.removeEventListener( 'dispose', onTextureDispose );

    deallocateTexture( texture );

    _this.info.memory.textures --;


};

var onRenderTargetDispose = function ( event ) {

    var renderTarget = event.target;

    renderTarget.removeEventListener( 'dispose', onRenderTargetDispose );

    deallocateRenderTarget( renderTarget );

    _this.info.memory.textures --;

};

var onMaterialDispose = function ( event ) {

    var material = event.target;

    material.removeEventListener( 'dispose', onMaterialDispose );

    deallocateMaterial( material );

};

// Buffer deallocation

var deleteBuffers = function ( geometry ) {

    var buffers = [
        '__webglVertexBuffer',
        '__webglNormalBuffer',
        '__webglTangentBuffer',
        '__webglColorBuffer',
        '__webglUVBuffer',
        '__webglUV2Buffer',

        '__webglSkinIndicesBuffer',
        '__webglSkinWeightsBuffer',

        '__webglFaceBuffer',
        '__webglLineBuffer',

        '__webglLineDistanceBuffer'
    ];

    for ( var i = 0, l = buffers.length; i < l; i ++ ) {

        var name = buffers[ i ];

        if ( geometry[ name ] !== undefined ) {

            _gl.deleteBuffer( geometry[ name ] );

            delete geometry[ name ];

        }

    }

    // custom attributes

    if ( geometry.__webglCustomAttributesList !== undefined ) {

        for ( var name in geometry.__webglCustomAttributesList ) {

            _gl.deleteBuffer( geometry.__webglCustomAttributesList[ name ].buffer );

        }

        delete geometry.__webglCustomAttributesList;

    }

    _this.info.memory.geometries --;

};

var deallocateGeometry = function ( geometry ) {

    delete geometry.__webglInit;

    if ( geometry instanceof THREE.BufferGeometry ) {

        for ( var name in geometry.attributes ) {

            var attribute = geometry.attributes[ name ];

            if ( attribute.buffer !== undefined ) {

                _gl.deleteBuffer( attribute.buffer );

                delete attribute.buffer;

            }

        }

        _this.info.memory.geometries --;

    } else {

        var geometryGroupsList = geometryGroups[ geometry.id ];

        if ( geometryGroupsList !== undefined ) {

            for ( var i = 0, l = geometryGroupsList.length; i < l; i ++ ) {

                var geometryGroup = geometryGroupsList[ i ];

                if ( geometryGroup.numMorphTargets !== undefined ) {

                    for ( var m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

                        _gl.deleteBuffer( geometryGroup.__webglMorphTargetsBuffers[ m ] );

                    }

                    delete geometryGroup.__webglMorphTargetsBuffers;

                }

                if ( geometryGroup.numMorphNormals !== undefined ) {

                    for ( var m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

                        _gl.deleteBuffer( geometryGroup.__webglMorphNormalsBuffers[ m ] );

                    }

                    delete geometryGroup.__webglMorphNormalsBuffers;

                }

                deleteBuffers( geometryGroup );

            }

            delete geometryGroups[ geometry.id ];

        } else {

            deleteBuffers( geometry );

        }

    }

    // TOFIX: Workaround for deleted geometry being currently bound

    _currentGeometryProgram = '';

};

var deallocateTexture = function ( texture ) {

    if ( texture.image && texture.image.__webglTextureCube ) {

        // cube texture

        _gl.deleteTexture( texture.image.__webglTextureCube );

        delete texture.image.__webglTextureCube;

    } else {

        // 2D texture

        if ( texture.__webglInit === undefined ) return;

        _gl.deleteTexture( texture.__webglTexture );

        delete texture.__webglTexture;
        delete texture.__webglInit;

    }

};

var deallocateRenderTarget = function ( renderTarget ) {

    if ( ! renderTarget || renderTarget.__webglTexture === undefined ) return;

    _gl.deleteTexture( renderTarget.__webglTexture );

    delete renderTarget.__webglTexture;

    if ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {

        for ( var i = 0; i < 6; i ++ ) {

            _gl.deleteFramebuffer( renderTarget.__webglFramebuffer[ i ] );
            _gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer[ i ] );

        }

    } else {

        _gl.deleteFramebuffer( renderTarget.__webglFramebuffer );
        _gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer );

    }

    delete renderTarget.__webglFramebuffer;
    delete renderTarget.__webglRenderbuffer;

};

var deallocateMaterial = function ( material ) {

    var program = material.program.program;

    if ( program === undefined ) return;

    material.program = undefined;

    // only deallocate GL program if this was the last use of shared program
    // assumed there is only single copy of any program in the _programs list
    // (that's how it's constructed)

    var i, il, programInfo;
    var deleteProgram = false;

    for ( i = 0, il = _programs.length; i < il; i ++ ) {

        programInfo = _programs[ i ];

        if ( programInfo.program === program ) {

            programInfo.usedTimes --;

            if ( programInfo.usedTimes === 0 ) {

                deleteProgram = true;

            }

            break;

        }

    }

    if ( deleteProgram === true ) {

        // avoid using array.splice, this is costlier than creating new array from scratch

        var newPrograms = [];

        for ( i = 0, il = _programs.length; i < il; i ++ ) {

            programInfo = _programs[ i ];

            if ( programInfo.program !== program ) {

                newPrograms.push( programInfo );

            }

        }

        _programs = newPrograms;

        _gl.deleteProgram( program );

        _this.info.memory.programs --;

    }

};

