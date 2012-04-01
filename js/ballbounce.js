(function(){
    
    var WIDTH = 400,
        HEIGHT = 300,
        VIEW_ANGLE = 45,
        ASPECT = WIDTH/HEIGHT,
        NEAR = 0.1,
        FAR = 10000,
        container = $('#container'),
        renderer = new THREE.WebGLRenderer(),
        camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE, ASPECT, NEAR, FAR),
        scene = new THREE.Scene(),
        radius = 50,
        segments = 16,
        rings = 16,
        sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000}),
        sphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, rings), sphereMaterial),
        pointLight = new THREE.PointLight(0xFFFFFF);
        
    camera.position.z = 300;
    scene.add(camera);
    
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    scene.add(pointLight);
    
    scene.add(sphere);

    renderer.setSize(WIDTH, HEIGHT);
    container.append(renderer.domElement);

    var one = { x : -40, y: -50, z: -150 };   
    var position = { x : 0, y: 0, z: 0 };
    var two = { x : 40, y: 50, z: 50 };
    var tweenHead = new TWEEN.Tween(position).
        to(one, 1200).
        onUpdate(update).
        easing(TWEEN.Easing.Elastic.EaseOut);    
    var tweenBack = new TWEEN.Tween(position).
        to(two, 200).
        onUpdate(update).
        delay(100).
        easing(TWEEN.Easing.Sinusoidal.EaseInOut);
    tweenBack.chain(tweenHead);
    tweenHead.chain(tweenBack);
    
    function update () {
        sphere.position.x = position.x;
        sphere.position.y = position.y;
        sphere.position.z = position.z;
    }

    tweenBack.start();
    
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        TWEEN.update();
    }
    
    render();
    
}());


















