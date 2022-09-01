const init = () => {
    const scene = initScene();
    const camera = initCamera();
    const renderer = initRenderer();
    const planeGeometry = initPlaneGeometry();
    const planeMaterial = initPlaneMaterial();
    const plane = initPlane(planeGeometry, planeMaterial);
    const clock = initClock();
    const stats = initStats();
    const hemiLight = initHemiLight();
    const hemiLightHelper = initHemiLightHelper(hemiLight);
    const dirLight = initDirLight();
    const mixers = [];

    // LIGHT
    scene.add(hemiLight);
    scene.add(hemiLightHelper);
    scene.add(dirLight);
    const dirLightHelper = initDirLightHelper(dirLight);
    scene.add(dirLightHelper);

    // GROUND
    scene.add(plane);

    // SKYDOME
    const vertexShader = document.getElementById('vertexShader').textContent;
    const fragmentShader = document.getElementById('fragmentShader').textContent;
    const uniforms = {
        'topColor': { value: new THREE.Color(0x0077ff) },
        'bottomColor': { value: new THREE.Color(0xffffff) },
        'offset': { value: 33 },
        'exponent': { value: 0.6 }
    };
    uniforms['topColor'].value.copy(hemiLight.color);

    scene.fog.color.copy(uniforms['bottomColor'].value);

    const skyGeometry = initSkyGeometry();
    const skyMaterial = initSkyMaterial(uniforms, vertexShader, fragmentShader);
    const sky = initSky(skyGeometry, skyMaterial);
    scene.add(sky);

    document.getElementById("webgloutput").appendChild(renderer.domElement);

    const trackballControls = initTrackballControls(camera, renderer);

    const geometry = [
        // [new THREE.TorusKnotGeometry(40, 5, 100, 16), 50],
        // [new THREE.TorusKnotGeometry(35, 4, 100, 16), 300],
        // [new THREE.TorusKnotGeometry(20, 3, 100, 16), 1000],
        // [new THREE.TorusKnotGeometry(18, 3, 100, 16), 2000],
        // [new THREE.TorusKnotGeometry(17, 2, 100, 16), 8000]
        [new THREE.IcosahedronGeometry(100, 16), 50],
        [new THREE.IcosahedronGeometry(100, 8), 300],
        [new THREE.IcosahedronGeometry(100, 4), 1000],
        [new THREE.IcosahedronGeometry(100, 2), 2000],
        [new THREE.IcosahedronGeometry(100, 1), 8000]
    ];

    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true
    });

    for (let j = 0; j < 100; j++) {
        const lod = new THREE.LOD();
        for (let i = 0; i < geometry.length; i++) {
            const mesh = new THREE.Mesh(geometry[i][0], material);
            mesh.scale.set(1.5, 1.5, 1.5);
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            lod.addLevel(mesh, geometry[i][1]);
        }

        lod.position.x = 9000 * (0.5 - Math.random());
        lod.position.y = 7500 * (0.5 - Math.random());
        lod.position.z = 9000 * (0.5 - Math.random());
        lod.updateMatrix();
        lod.matrixAutoUpdate = false;
        scene.add(lod);
    }

    const animate = () => {
        requestAnimationFrame(animate);
        renderScene();
    }

    const controls = {
        rotationSpeed: 0.01,
        // bouncingSpeed: 0.01,
        numberOfObjects: scene.children.length,
        removeOBJ: function () {
            const allChildren = scene.children;
            const lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        },
        addSphere: function () {
            const sphereSize = 10 + Math.ceil((Math.random() * 10));
            const sphereGeometry = new THREE.SphereGeometry(sphereSize, sphereSize, sphereSize);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: Math.random() * 0xffffff,
                // wireframe: true
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.castShadow = true;
            sphere.name = "Sphere__" + sphereSize;
            sphere.position.x = -50 + Math.round((Math.random() * planeGeometry.parameters.width));
            sphere.position.y = 10 + Math.round((Math.random() * 5));
            sphere.position.z = -50 + Math.round((Math.random() * planeGeometry.parameters.height));
            scene.add(sphere);
            this.numberOfObjects = scene.children.length;
            console.log('Created sphere with name: ' + sphere.name);
        },
        addHemisphereLight: () => {
            hemiLight.visible = !hemiLight.visible;
            hemiLightHelper.visible = !hemiLightHelper.visible;
        },
        addDirectionalLight: () => {
            dirLight.visible = !dirLight.visible;
            dirLightHelper.visible = !dirLightHelper.visible;
        }
    }

    const gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    // gui.add(controls, 'bouncingSpeed', 0, 0.5);
    gui.add(controls, 'addSphere');
    gui.add(controls, 'removeOBJ');
    gui.add(controls, 'addHemisphereLight');
    gui.add(controls, 'addDirectionalLight');
    gui.add(controls, 'numberOfObjects').listen();

    // let step = 0;
    const renderScene = () => {
        stats.update();
        trackballControls.update(clock.getDelta());
        const delta = clock.getDelta();
        for (let i = 0; i < mixers.length; i++) {
            mixers[i].update(delta);
            console.log(mixers)
        }
        scene.traverse((e) => {
            if (e instanceof THREE.Mesh && 
                e != plane && e != dirLight && 
                e != dirLightHelper && e != hemiLightHelper && e != hemiLight &&
                e != sky) {
                e.rotation.x += controls.rotationSpeed;
                e.rotation.y += controls.rotationSpeed;
                e.rotation.z += controls.rotationSpeed;

                // step += controls.bouncingSpeed;
                // e.position.x = 20 + 10 * (Math.cos(step));
                // e.position.y = 20 + 10 * Math.abs(Math.sin(step));
            }
        });
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    animate();

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize, false);
}

const initScene = () => {
    const scene = new THREE.Scene();
    // const axes = new THREE.AxesHelper(20);
    scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 1, 15000);
    // scene.add(axes);
    return scene;
}

const initCamera = () => {
    const fov = 45; //Camera frustum vertical field of view.
    const aspect = window.innerWidth / window.innerHeight; // Camera frustum aspect ratio.
    const near = 1;//Camera frustum near plane.
    const far = 15000; //Camera frustum far plane.
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 250);
    return camera;
}

const initRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setClearColor(new THREE.Color(0xcccccc));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    return renderer;
}

const initSpotLight = () => {
    const spotLight = new THREE.SpotLight(0xffffff, 1.5, 200, 90);
    spotLight.position.set(10, 10, 0);
    spotLight.castShadow = true;
    return spotLight;
}

// GroundGeo
const initPlaneGeometry = () => {
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    return planeGeometry;
}

// GroundMat
const initPlaneMaterial = () => {
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    planeMaterial.color.setHSL(0.195, 1, 0.75);
    return planeMaterial;

}

const initPlane = (planeGeometry, planeMat) => {
    const plane = new THREE.Mesh(planeGeometry, planeMat);
    plane.position.y = -20;
    plane.rotation.x = -Math.PI / 2;
    // plane.position.set(0, 0, 0);
    plane.receiveShadow = true;
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

const initMixer = (mesh, gltf) => {
    const mixer = new THREE.AnimationMixer(mesh);
    mixer.clipAction(gltf.animations[0]).setDuration(1).play();
    return mixer;
}

function initStats(type) {
    const panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    const stats = new Stats();
    stats.showPanel(panelType);
    document.body.appendChild(stats.dom);
    return stats;
}

function initTrackballControls(camera, renderer) {
    const trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 2.0;
    trackballControls.zoomSpeed = 1.5;
    trackballControls.panSpeed = 0.8;
    trackballControls.staticMoving = true;
    return trackballControls;
}

const createCube = () => {
    const cubeSize = 10 + Math.ceil((Math.random() * 20));
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFF00,
        wireframe: true,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = "Cube__" + cubeSize;
    console.log('Created cube with name: ' + cube.name);
    return cube;
}

const createSphere = () => {
    const sphereSize = 10 + Math.ceil((Math.random() * 20));
    const sphereGeometry = new THREE.SphereGeometry(sphereSize, sphereSize, sphereSize);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FFFF,
        wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.name = "Sphere__" + sphereSize;
    console.log('Created sphere with name: ' + sphere.name);
    return sphere;
}

const createTorus = () => {
    const torusSize = 2 + Math.ceil((Math.random() * 20));
    const torusGeometry = new THREE.TorusKnotGeometry(10, 3, torusSize * 10, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF00FF,
        wireframe: true
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    torusKnot.castShadow = true;
    torusKnot.name = "TorusKnot__" + torusSize;
    console.log('Created torusKnot with name: ' + torusKnot.name);
    return torusKnot;
}

const initHemiLight = () => {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 100, 0);
    return hemiLight;
}

const initHemiLightHelper = (hemiLight) => {
    const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    return hemiLightHelper;
}

const initDirLight = () => {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 4, 0);
    dirLight.position.multiplyScalar(30);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    return dirLight;
}

const initDirLightHelper = (dirLight) => {
    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    return dirLightHelper;
}

const initSkyGeometry = () => {
    const skyGeometry = new THREE.SphereGeometry(4000, 32, 15);
    return skyGeometry;
}

const initSkyMaterial = (uniforms, vertexShader, fragmentShader) => {
    const skyMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    });
    return skyMaterial;
}

const initSky = (skyGeometry, skyMaterial) => {
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    return sky;
}