const init = () => {
    const scene = initScene();
    const camera = initCamera();
    const renderer = initRenderer();
    const planeGeometry = initPlaneGeometry();
    const plane = initPlane(planeGeometry);
    const spotLight = initSpotLight();
    const ambientLight = initAmbientLight();
    const clock = initClock();
    const stats = initStats();
    const mixer = initMixer();

    // scene.fog = new THREE.Fog(0xffffff, 10, 100);
    scene.fog = new THREE.FogExp2(0xffffff, 0.01);

    const cube = createCube();
    
    scene.add(cube);
    scene.add(plane);
    camera.lookAt(scene.position);
    scene.add(spotLight);
    scene.add(ambientLight);

    document.getElementById("webgloutput").appendChild(renderer.domElement);

    // const trackballControls = initTrackballControls(camera, renderer);
 
    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.set(0, 10, 0)
        renderer.render(scene, camera);
    };

    animate();

    // const controls = {
    //     rotationSpeed: 0.02,
    //     numberOfObjects: scene.children.length,
    //     removeCube: function() {
    //         const allChildren = scene.children;
    //         const lastObject = allChildren[allChildren.length - 1];
    //         if (lastObject instanceof THREE.Mesh) {
    //             scene.remove(lastObject);
    //             this.numberOfObjects = scene.children.length;
    //         }
    //     },
    //     addCube: function() {
    //         const cubeSize = Math.ceil((Math.random() * 3));
    //         const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    //         const cubeMaterial = new THREE.MeshLambertMaterial({
    //             color: Math.random() * 0xffffff
    //         });
    //         const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    //         cube.castShadow = true;
    //         cube.name = "cube-" + scene.children.length;
    //         cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
    //         cube.position.y = 1 + Math.round((Math.random() * 5));
    //         cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
    //         scene.add(cube);
    //         this.numberOfObjects = scene.children.length;
    //         console.log('Created cube with name: ' + cube.name);
    //     }
    // }
    
    // const gui = new dat.GUI();
    // gui.add(controls, 'rotationSpeed', 0, 0.5);
    // gui.add(controls, 'addCube');
    // gui.add(controls, 'removeCube');
    // gui.add(controls, 'numberOfObjects').listen();

    // const renderScene = () => {
    //     stats.update();
    //     trackballControls.update(clock.getDelta());
    //     scene.traverse((e) => {
    //         if (e instanceof THREE.Mesh && e != plane) {
    //             e.rotation.x += controls.rotationSpeed;
    //             e.rotation.y += controls.rotationSpeed;
    //             e.rotation.z += controls.rotationSpeed;
    //         }
    //     });

    //     requestAnimationFrame(renderScene);
    //     renderer.render(scene, camera);
    // }

    // renderScene();

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize, false);
}

const initScene = () => {
    const scene = new THREE.Scene();
    const axes = new THREE.AxesHelper(20);
    scene.add(axes);
    return scene;
}

const initCamera = () => {
    const fov = 75; //Camera frustum vertical field of view.
    const aspect = window.innerWidth / window.innerHeight; // Camera frustum aspect ratio.
    const near = 0.1;//Camera frustum near plane.
    const far = 1000; //Camera frustum far plane.
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 10, 20);
    return camera;
}

const initRenderer = () => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xcccccc));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    return renderer;
}

const initSpotLight = () => {
    const spotLight = new THREE.SpotLight(0xffffff, 1.5, 200, 90);
    spotLight.position.set(10, 10, 0);
    spotLight.castShadow = true;
    return spotLight;
}

const initPlaneGeometry = () => {
    const planeGeometry = new THREE.PlaneGeometry(60, 60, 1, 1);
    return planeGeometry;
}

const initPlane = (planeGeometry) => {
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshLambertMaterial({ color: 0xffffff }));
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    return plane;
}

const initAmbientLight = () => {
    const ambientLight = new THREE.AmbientLight(0x3c3c3c);
    return ambientLight;
}

const initClock = () => {
    const clock = new THREE.Clock();
    return clock;
}

const initMixer = () => {
    const mixer = new THREE.AnimationMixer();
    return mixer;
}

function initStats(type) {
    const panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    const stats = new Stats();
    stats.showPanel(panelType);
    document.body.appendChild(stats.dom);
    return stats;
}

// function initTrackballControls(camera, renderer) {
//     const trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
//     trackballControls.rotateSpeed = 2.0;
//     trackballControls.zoomSpeed = 1.5;
//     trackballControls.panSpeed = 0.8;
//     trackballControls.staticMoving = true;
//     return trackballControls;
// }

const createCube = () => {
    const cubeSize = Math.ceil((Math.random() * 10));
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xa1b2c3,
        // wireframe: true,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = "Cube__" + cubeSize;
    console.log('Created cube with name: ' + cube.name);
    return cube;
}