let elements = document.querySelectorAll(".rolling-text");

elements.forEach((element) => {
    let innerText = element.innerText;
    element.innerHTML = "";

    let textContainer = document.createElement("div");
    textContainer.classList.add("block");

    for (let letter of innerText) {
        let span = document.createElement("span");
        span.innerText = letter.trim() === "" ? "\xa0" : letter;
        span.classList.add("letter");
        textContainer.appendChild(span);
    }

    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(new THREE.Color(0xffffff))
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xfff, 1);
scene.add(ambientLight)

const gltfLoader = new THREE.GLTFLoader();

let key
let exp

gltfLoader.load('./models/chiave.gltf', (gltf) => {
    key = gltf.scene.children[0]
    // key.rotation.x = 1
    // key.position.y = -1
    // key.center()
})

gltfLoader.load('./models/exp.gltf', (gltf) => {
    console.log(gltf.scene.children)
    exp = gltf.scene.children[0]
})


const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x5c5e61 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

const sphereGeometry = new THREE.SphereGeometry(1, 100, 100);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x5c5e61 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

const torusGeometry = new THREE.TorusGeometry(1, .5, 10, 30);
const torusMaterial = new THREE.MeshLambertMaterial({ color: 0x5c5e61 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial)

const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
directionalLight.position.y = 1
scene.add(directionalLight)
const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);



window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

function drawSomething(meshType) {
    console.log(meshType)
    switch (meshType) {
        case 'cube':
            scene.add(cube)
            gsap.timeline({ duration: .3 }).fromTo(cube.scale, {
                x: 0.01,
                y: 0.01,
                z: 0.01,
            }, {
                x: 1,
                y: 1,
                z: 1
            })
            break
        case 'sphere':
            scene.add(sphere)
            gsap.timeline({ duration: .3 }).fromTo(sphere.scale, {
                x: 0.01,
                y: 0.01,
                z: 0.01,
            }, {
                x: 1,
                y: 1,
                z: 1
            })
            break
        case 'torus':
            scene.add(torus)
            gsap.timeline({ duration: .3 }).fromTo(torus.scale, {
                x: 0.01,
                y: 0.01,
                z: 0.01,
            }, {
                x: 1,
                y: 1,
                z: 1
            })
            break
        case 'exp':
            scene.add(exp)
            gsap.timeline({ duration: .3 }).fromTo(exp.scale, {
                x: 0.01,
                y: 0.01,
                z: 0.01,
            }, {
                x: 40,
                y: 40,
                z: 40
            })
            break
        case 'key':
            scene.add(key)
            gsap.timeline({ duration: .3 }).fromTo(key.scale, {
                x: 0.01,
                y: 0.01,
                z: 0.01,
            }, {
                x: 40,
                y: 40,
                z: 40
            })
            break
        default:
            console.error('no match')
            break
    }
}

function onMouseLeave(meshType) {
    removeFromScene(meshType)
}


function removeFromScene(meshType) {
    switch (meshType) {
        case 'cube':
            gsap.to(
                cube.scale, {
                duration: .3,
                x: 0.01,
                y: 0.01,
                z: 0.01,
                onComplete: () => {
                    scene.remove(cube)
                }
            }
            )
            break
        case 'sphere':
            gsap.to(sphere.scale, {
                duration: .3,
                x: 0.01,
                y: 0.01,
                z: 0.01,
                onComplete: () => {
                    scene.remove(sphere)
                }
            })
            break
        case 'exp':
            gsap.to(exp.scale, {
                duration: .3,
                x: 0.01,
                y: 0.01,
                z: 0.01,
                onComplete: () => {
                    scene.remove(exp)
                }
            })
            break
        case 'key':
            gsap.to(key.scale, {
                duration: .3,
                x: 0.01,
                y: 0.01,
                z: 0.01,
                onComplete: () => {
                    scene.remove(key)
                }
            })
            break
        case 'torus':
            gsap.to(torus.scale, {
                duration: .3,
                x: 0.01,
                y: 0.01,
                z: 0.01,
                onComplete: () => {
                    scene.remove(torus)
                }
            })
    }
}

function makeMeshBigger(meshType, path) {
    switch (meshType) {
        case 'cube':
            gsap.to(
                cube.scale, {
                duration: .3,
                ease: "circ.out",
                x: 4,
                y: 4,
                z: 4,
                // onComplete: () => {
                //     window.location = path
                // }
            }
            )
            break
        case 'sphere':
            gsap.to(sphere.scale, {
                duration: .3,
                ease: "circ.out",
                x: 4,
                y: 4,
                z: 4,
                // onComplete: () => {
                //     window.location = path
                // }
            })
            break
        case 'exp':
            gsap.to(exp.scale, {
                duration: .3,
                ease: "circ.out",
                x: 4,
                y: 4,
                z: 4,
                // onComplete: () => {
                //     window.location = path
                // }
            })
            break
        case 'key':
            gsap.to(key.scale, {
                duration: .3,
                ease: "circ.out",
                x: 100,
                y: 100,
                z: 100,
                // onComplete: () => {
                //     window.location = path
                // }
            })
            break
        case 'torus':
            gsap.to(torus.scale, {
                duration: .3,
                ease: "circ.out",
                x: 2,
                y: 2,
                z: 2,
                // onComplete: () => {
                //     window.location = path
                // }
            })
    }
}

function onClick(e, meshType, element) {
    e.preventDefault()
    console.log(e.target.closest('a').getAttribute('href'))
    let target = e.target.closest('a')
    let href = target.getAttribute('href')
    // makeMeshBigger(meshType, href);
}
// elementi menu
const menuElements = document.querySelectorAll('.rolling-text')

menuElements.forEach((element) => {

    let meshType = '';
    meshType = element.dataset.mesh

    element.addEventListener("mouseenter", () => {
        drawSomething(meshType)
    });

    element.addEventListener('mouseleave', () => onMouseLeave(meshType))

    //element.addEventListener('click', (e) => onClick(e, meshType, element))
});

camera.position.z = 5;



const clock = new THREE.Clock()
function animate() {

    const elapsedTime = clock.getElapsedTime()


    requestAnimationFrame(animate);

    cube.rotation.y = elapsedTime
    cube.rotation.z = .3

    sphere.position.y = Math.sin(2 * elapsedTime)
    sphere.position.x = Math.cos(elapsedTime)

    if (key) {
        // console.log(key)
        key.rotation.y = -.75
        key.rotation.z = 2 * elapsedTime
    }

    if(exp) {
        exp.rotation.y = -.75
        exp.rotation.x = 4*elapsedTime
    }

    torus.rotation.y = 2 * elapsedTime
    torus.rotation.x = .3

    renderer.render(scene, camera);
};


animate();