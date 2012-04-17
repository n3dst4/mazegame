
                if (! map.rows[y][x].isBlocked) {
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1, ceilingMaterials),
                        ceilingMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = scale + (scale/2);
                    //scene.add(cube);
                    THREE.GeometryUtils.merge(mergedGeometry, cube);
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1, floorMaterials),
                        floorMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = (-scale/2);
                    //scene.add(cube);
                    THREE.GeometryUtils.merge(mergedGeometry, cube);
                    
                }
                else {
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1, wallMaterials),
                        wallMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = (scale/2);
                    // RHS
                    cube.geometry.faceVertexUvs[0][0] = [
                        new THREE.UV(1, 0),
                        new THREE.UV(0, 0),
                        new THREE.UV(0, 1),
                        new THREE.UV(1, 1),
                    ];
                    // LHS
                    cube.geometry.faceVertexUvs[0][1] = [
                        new THREE.UV(0, 1),
                        new THREE.UV(1, 1),
                        new THREE.UV(1, 0),
                        new THREE.UV(0, 0),
                    ];
                    // Back face
                    cube.geometry.faceVertexUvs[0][2] = [
                        new THREE.UV(1, 1),
                        new THREE.UV(1, 0),
                        new THREE.UV(0, 0),
                        new THREE.UV(0, 1),
                    ];
                    // Front
                    cube.geometry.faceVertexUvs[0][3] = [
                        new THREE.UV(0, 0),
                        new THREE.UV(0, 1),
                        new THREE.UV(1, 1),
                        new THREE.UV(1, 0),
                    ];
                    THREE.GeometryUtils.merge(mergedGeometry, cube);
                    //scene.add(cube);                    
                }