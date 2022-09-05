// -------------------------------------------------------------------------------------------------
// INIT()
// -------------------------------------------------------------------------------------------------
const init = () => {
    const scene = initScene();
    const camera = initCamera();
    const renderer = initRenderer();
    const plane = initPlane();

    const spotLight = initSpotLight();
    const ambientLight = initAmbientLight();
    const hemiLight = initHemiLight();
    const hemiLightHelper = initHemiLightHelper(hemiLight);
    const dirLight = initDirLight();

    const stats = initStats();
    const clock = initClock();
    const mixer = initMixer(scene);
    const morphs = []

    const cube = createCube();
    const torus = createTorus();

    // OBJ
    scene.add(cube);
    scene.add(torus);

    // GLTFLoader
    initGLTFLoader(scene, morphs, mixer);

    // LIGHT
    scene.add(hemiLight);
    scene.add(hemiLightHelper);
    scene.add(dirLight);
    const dirLightHelper = initDirLightHelper(dirLight);
    scene.add(dirLightHelper);
    // scene.add(spotLight);
    // scene.add(ambientLight);

    // GROUND
    scene.add(plane);

    // SKYDOME
    const vertexShader = document.getElementById('vertexShader').textContent;
    const fragmentShader = document.getElementById('fragmentShader').textContent;
    const uniforms = {
        'topColor': { value: new THREE.Color(0x0044ff) },
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

    // WEBGLOUTPUT
    document.getElementById("webgloutput").appendChild(renderer.domElement);

    // TRACKBALL CONTROLS
    const trackballControls = initTrackballControls(camera, renderer);

    // ANIMATE
    const animate = (msTime) => {
        requestAnimationFrame(animate);

        const time = msTime / 1000;

        cube.position.x = Math.cos(time) * 200;
        cube.position.y = 400 + Math.sin(time) * 200;
        cube.position.z = -600 + Math.sin(time) * 200;

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.03;

        torus.position.x = Math.cos(time + 10) * 200;
        torus.position.y = 400 + Math.sin(time + 10) * 200;
        torus.position.z = -600 + Math.sin(time + 10) * 200;

        torus.rotation.x += 0.02;
        torus.rotation.y += 0.03;

        renderScene();
        stats.update();
    };

    // CONTROLS
    const controls = {
        numberOfObjects: scene.children.length,
        HemisphereLight: () => {
            hemiLight.visible = !hemiLight.visible;
            hemiLightHelper.visible = !hemiLightHelper.visible;
        },
        DirectionalLight: () => {
            dirLight.visible = !dirLight.visible;
            dirLightHelper.visible = !dirLightHelper.visible;
        },
        newFlamingo: function () {
            initGLTFLoaderFlamingo(scene, morphs, mixer, 500 + Math.random(), 1, 100 - Math.random() * 1000, (100 + Math.random()) * 2, (-50 * Math.random()) * 10, true);
            this.numberOfObjects = scene.children.length;
        },
        newParrot: function () {
            initGLTFLoaderParrot(scene, morphs, mixer, 500 + Math.random(), 1, 100 - Math.random() * 1000, (100 + Math.random()) * 2, (-50 * Math.random()) * 10, true);
            this.numberOfObjects = scene.children.length;
        },
        newStork: function () {
            initGLTFLoaderStork(scene, morphs, mixer, 500 + Math.random(), 1, 100 - Math.random() * 1000, (100 + Math.random()) * 2, (-50 * Math.random()) * 10, true);
            this.numberOfObjects = scene.children.length;
        },
    }

    // WebGLCubeRenderTarget
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(255);
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
    gui.add(controls, 'newFlamingo');
    gui.add(controls, 'newParrot');
    gui.add(controls, 'newStork');
    gui.add(standardMaterial, 'roughness', 0, 1);
    gui.add(standardMaterial, 'metalness', 0, 1);
    gui.add(renderer, 'toneMappingExposure', 0, 2).name('exposure');
    gui.add(controls, 'numberOfObjects').listen();

    // RENDER
    const renderScene = () => {
        const delta = clock.getDelta();
        trackballControls.update(delta);
        mixer.update(delta)
        for (let i = 0; i < morphs.length; i++) {
            const morph = morphs[i];
            morph.position.x += morph.speed * delta;
            if (morph.position.x > 2000) {
                morph.position.x = -1000 - Math.random() * 500;
            }
        }
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };

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

// -------------------------------------------------------------------------------------------------
// FUNCTIONS()
// -------------------------------------------------------------------------------------------------
const initScene = () => {
    const scene = new THREE.Scene();
    // const axes = new THREE.AxesHelper(20);
    // scene.background = new THREE.Color().setHSL(204, 100, 72);
    // scene.fog = new THREE.Fog(scene.background, 1, 20000);
    // scene.fog = new THREE.FogExp2(0x000000, 1);
    scene.background = new THREE.Color(0x59472b);
    scene.fog = new THREE.Fog(scene.background, 1000, 3000);
    // scene.add(axes);
    return scene;
}

const initCamera = () => {
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 15000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 200);
    return camera;
}

const initRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // renderer.setAnimationLoop(animate);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    return renderer;
}
// -------------------------------------------------------------------------------------------------
// FUNCTIONS LIGHT()
// -------------------------------------------------------------------------------------------------
const initSpotLight = () => {
    const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 5, 0.3);
    spotLight.position.set(0, 1500, 1000);
    spotLight.target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 2500;
    spotLight.shadow.camera.near = 1200;
    spotLight.shadow.bias = 0.0001;

    spotLight.shadow.mapSize.width = window.innerWidth;
    spotLight.shadow.mapSize.height = window.innerHeight;
    return spotLight;
}

const initAmbientLight = () => {
    const ambientLight = new THREE.AmbientLight(0x444444);
    return ambientLight;
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
    dirLight.position.set(-1, 10, 0);
    dirLight.position.multiplyScalar(30);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 1000;

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
// -------------------------------------------------------------------------------------------------
// FUNCTIONS GROUND()
// -------------------------------------------------------------------------------------------------
const initPlane = () => {
    const planeGeometry = new THREE.PlaneGeometry(20000, 20000, 1, 1);
    // const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x59472b });
    const loader = initLoader();
    // planeMaterial.color.setHSL(0.095, 1, 0.75);
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane = new THREE.Mesh(planeGeometry, loader);
    plane.position.y = -100;
    plane.rotation.x = -Math.PI / 2;
    // plane.position.set(0, 0, 0);
    plane.receiveShadow = true;
    return plane;
}
// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
const initMixer = (scene) => {
    const mixer = new THREE.AnimationMixer(scene);
    return mixer;
}

const initClock = () => {
    const clock = new THREE.Clock();
    return clock;
}

const initStats = (type) => {
    const panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    const stats = new Stats();
    stats.showPanel(panelType);
    document.body.appendChild(stats.dom);
    return stats;
}
// -------------------------------------------------------------------------------------------------
// FUNCTIONS CONTROLS()
// -------------------------------------------------------------------------------------------------
function initTrackballControls(camera, renderer) {
    const trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 2.0;
    trackballControls.zoomSpeed = 1.5;
    trackballControls.panSpeed = 0.8;
    trackballControls.staticMoving = true;
    return trackballControls;
}
// -------------------------------------------------------------------------------------------------
// UNCTIONS SKY()
// -------------------------------------------------------------------------------------------------
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
// -------------------------------------------------------------------------------------------------
// FUNCTIONS LOADER()
// -------------------------------------------------------------------------------------------------
const initLoader = () => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./assets/sea-texture.jpg');
    texture.anisotropy = 16;
    const textureMaterial = new THREE.MeshLambertMaterial({
        color: 0x00afff,
        map: texture,
        fog: true,
    });
    return textureMaterial;
}

const initGLTFLoader = (scene, morphs, mixer) => {
    const gltfloader = new THREE.GLTFLoader();
    gltfloader.load('assets/glb/Flamingo.glb', (gltf) => {
        const mesh = gltf.scene.children[0];
        const clip = gltf.animations[0];

        initMotph(scene, morphs, mixer, mesh, clip, 400, 1, 100 - Math.random() * 1000, 100, -50, true);
        initMotph(scene, morphs, mixer, mesh, clip, 400, 1, 100 - Math.random() * 1000, 100, -100, true);
        initMotph(scene, morphs, mixer, mesh, clip, 400, 1, 100 - Math.random() * 1000, 100, -200, true);
    });
    return gltfloader;
}

const initGLTFLoaderFlamingo = (scene, morphs, mixer, speed, duration, x, y, z, fudgeColor) => {
    const gltfloader = new THREE.GLTFLoader();
    gltfloader.load('assets/glb/Flamingo.glb', (gltf) => {
        const mesh = gltf.scene.children[0];
        const clip = gltf.animations[0];
        initMotph(scene, morphs, mixer, mesh, clip, speed, duration, x, y, z, fudgeColor);
    });
    return gltfloader;
}

const initGLTFLoaderStork = (scene, morphs, mixer, speed, duration, x, y, z, fudgeColor) => {
    const gltfloader = new THREE.GLTFLoader();
    gltfloader.load('assets/glb/Stork.glb', (gltf) => {
        const mesh = gltf.scene.children[0];
        const clip = gltf.animations[0];
        initMotph(scene, morphs, mixer, mesh, clip, speed, duration, x, y, z, fudgeColor);
    });
    return gltfloader;
}

const initGLTFLoaderParrot = (scene, morphs, mixer, speed, duration, x, y, z, fudgeColor) => {
    const gltfloader = new THREE.GLTFLoader();
    gltfloader.load('assets/glb/Parrot.glb', (gltf) => {
        const mesh = gltf.scene.children[0];
        const clip = gltf.animations[0];
        initMotph(scene, morphs, mixer, mesh, clip, speed, duration, x, y, z, fudgeColor);
    });
    return gltfloader;
}


const initMotph = (scene, morphs, mixer, mesh, clip, speed, duration, x, y, z, fudgeColor) => {
    mesh = mesh.clone();
    mesh.material = mesh.material.clone();
    if (fudgeColor) {
        mesh.material.color.offsetHSL(0, Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25);
    }
    mesh.speed = speed;
    mixer.clipAction(clip, mesh).
        setDuration(duration).
        startAt(- duration * Math.random()).
        play();

    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.PI / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    morphs.push(mesh);

    return mesh;
}
// -------------------------------------------------------------------------------------------------
// CREATE OBJ
// -------------------------------------------------------------------------------------------------
const createCube = () => {
    const cubeSize = 10 + Math.ceil((Math.random() * 20));
    const cubeGeometry = new THREE.BoxGeometry(30, 30, 30);
    const standardMaterial_ = new THREE.MeshStandardMaterial({
        roughness: 0.1,
        metalness: 0.5
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
    sphere.position.set(0, 400, -600);
    sphere.name = "Sphere__" + sphereSize;
    console.log('Created sphere with name: ' + sphere.name);
    return sphere;
}

const createTorus = () => {
    const torusSize = 2 + Math.ceil((Math.random() * 20));
    const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 228, 16);
    const standardMaterial_ = new THREE.MeshStandardMaterial({
        roughness: 0.1,
        metalness: 0.5
    });
    const torusKnot = new THREE.Mesh(torusGeometry, standardMaterial_);
    torusKnot.castShadow = true;
    torusKnot.name = "TorusKnot__" + torusSize;
    console.log('Created torusKnot with name: ' + torusKnot.name);
    return torusKnot;
}
// -------------------------------------------------------------------------------------------------
// BACKGROUND SPHERE
// -------------------------------------------------------------------------------------------------
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