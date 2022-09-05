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

    const cube = createCube();
    const torus = createTorus();

    scene.add(cube);
    scene.add(torus);

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
        'topColor': { value: new THREE.Color(0x0044ff) },
        'bottomColor': { value: new THREE.Color(0xff00ff) },
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

    backgroundSphere(scene);

    const animate = (msTime) => {
        requestAnimationFrame(animate);

        const time = msTime / 1000;

        cube.position.x = Math.cos(time) * 100;
        cube.position.y = Math.sin(time) * 100;
        cube.position.z = Math.sin(time) * 100;

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.03;

        torus.position.x = Math.cos(time + 10) * 100;
        torus.position.y = Math.sin(time + 10) * 100;
        torus.position.z = Math.sin(time + 10) * 100;

        torus.rotation.x += 0.02;
        torus.rotation.y += 0.03;

        renderScene();
    }

    const controls = {
        numberOfObjects: scene.children.length,
        HemisphereLight: () => {
            hemiLight.visible = !hemiLight.visible;
            hemiLightHelper.visible = !hemiLightHelper.visible;
        },
        DirectionalLight: () => {
            dirLight.visible = !dirLight.visible;
            dirLightHelper.visible = !dirLightHelper.visible;
        }
    }

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    cubeRenderTarget.texture.type = THREE.HalfFloatType;

    const standardMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        envMap: cubeRenderTarget.texture,
        roughness: 0.01,
        metalness: 0.05,
    });

    const gui = new dat.GUI();
    gui.add(controls, 'HemisphereLight');
    gui.add(controls, 'DirectionalLight');
    gui.add(standardMaterial, 'roughness', 0, 1);
    gui.add(standardMaterial, 'metalness', 0, 1);
    gui.add(renderer, 'toneMappingExposure', 0, 2).name('exposure');
    gui.add(controls, 'numberOfObjects').listen();

    const renderScene = () => {
        stats.update();
        trackballControls.update(clock.getDelta());
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    const sphere = createSphere(standardMaterial);

    scene.add(sphere);

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
    const axes = new THREE.AxesHelper(20);
    scene.background = new THREE.Color().setHSL(204, 100, 72);
    scene.fog = new THREE.Fog(scene.background, 1, 20000);
    scene.add(axes);
    return scene;
}

const initCamera = () => {
    const fov = 45; 
    const aspect = window.innerWidth / window.innerHeight; 
    const near = 1;
    const far = 15000; 
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 450);
    return camera;
}

const initRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    return renderer;
}

// GroundGeo
const initPlaneGeometry = () => {
    const planeGeometry = new THREE.PlaneGeometry(200, 200, 1, 1);
    return planeGeometry;
}

// GroundMat
const initPlaneMaterial = () => {
    const loader = initLoader();
    // const texturePlaneMaterial = loader.load('./assets/textura.jpeg');
    // texturePlaneMaterial.anisotropy = 16;
    // const planeMaterial = new THREE.MeshLambertMaterial({ 
    //     // color: 0xffffff,
    //     map: texturePlaneMaterial,
    //     fog: false, 
    // });
    // planeMaterial.color.setHSL(0.195, 1, 0.75);
    // return planeMaterial;

    return loader;
}

const initPlane = (planeGeometry, planeMat) => {
    const plane = new THREE.Mesh(planeGeometry, planeMat);
    plane.position.y = -150;
    plane.rotation.x = -Math.PI / 2;
    // plane.position.set(0, 0, 0);
    plane.receiveShadow = true;
    return plane;
}

const initClock = () => {
    const clock = new THREE.Clock();
    return clock;
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
    const cubeGeometry = new THREE.BoxGeometry(30, 30, 30);
    const standardMaterial_ = new THREE.MeshStandardMaterial({
        roughness: 0.1,
        metalness: 0
    });
    const cube = new THREE.Mesh(cubeGeometry, standardMaterial_);
    cube.castShadow = true;
    cube.name = "Cube__" + cubeSize;
    console.log('Created cube with name: ' + cube.name);
    return cube;
}

const createSphere = (standardMaterial) => {
    const sphereSize = 10 + Math.ceil((Math.random() * 20));
    const sphereGeometry = new THREE.IcosahedronGeometry(50, 15);
    const sphere = new THREE.Mesh(sphereGeometry, standardMaterial);
    sphere.castShadow = true;
    sphere.name = "Sphere__" + sphereSize;
    console.log('Created sphere with name: ' + sphere.name);
    return sphere;
}

const createTorus = () => {
    const torusSize = 2 + Math.ceil((Math.random() * 20));
    const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 228, 16);
    const standardMaterial_ = new THREE.MeshStandardMaterial({
        roughness: 0.1,
        metalness: 0
    });
    const torusKnot = new THREE.Mesh(torusGeometry, standardMaterial_);
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
    const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 1);
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

    const d = 200;

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

const initLoader = () => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./assets/texture.jpeg');
    texture.anisotropy = 16;
    const textureMaterial = new THREE.MeshLambertMaterial({ 
        // color: 0xffffff,
        map: texture,
        fog: false, 
    });
    return textureMaterial;
}

const backgroundSphere = (scene) => {
    const icosahedronGeometry = [
        [new THREE.IcosahedronGeometry(50, 16), 50],
        [new THREE.IcosahedronGeometry(50, 8), 300],
        [new THREE.IcosahedronGeometry(50, 4), 1000],
        [new THREE.IcosahedronGeometry(50, 2), 2000],
        [new THREE.IcosahedronGeometry(50, 1), 8000]
    ];

    const lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true
    });

    for (let j = 0; j < 2000; j++) {
        const lod = new THREE.LOD();
        for (let i = 0; i < icosahedronGeometry.length; i++) {
            const mesh = new THREE.Mesh(icosahedronGeometry[i][0], lambertMaterial);
            mesh.scale.set(1.5, 1.5, 1.5);
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            lod.addLevel(mesh, icosahedronGeometry[i][1]);
        }
        lod.position.x = 10000 * (0.5 - Math.random());
        lod.position.y = 7500 * (0.5 - Math.random());
        lod.position.z = 10000 * (0.5 - Math.random());
        lod.updateMatrix();
        lod.matrixAutoUpdate = false;
        scene.add(lod)
    }
}