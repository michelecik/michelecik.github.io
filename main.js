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



const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xfff, 1);
scene.add(ambientLight)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshToonMaterial({ color: 0x5c5e61 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

const sphereGeometry = new THREE.SphereGeometry(1, 100, 100);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x5c5e61 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

const torusGeometry = new THREE.SphereGeometry(1, 100, 100);
const torusMaterial = new THREE.MeshLambertMaterial({ color: 0x5c5e61 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial)

const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
console.log(directionalLight)
directionalLight.position.y = 1

scene.add(directionalLight)
const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helper);

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
            let tl = gsap.timeline({ duration: .3 }).fromTo(torus.scale, {
                x: 0.01,
                y: 0.01,
                z: 0.01,
            }, {
                x: 1,
                y: 1,
                z: 1
            })
            break
        default:
            console.error('no match')
            break
    }
}

function onMouseLeave(meshType) {
    console.log('removeFromSceneStart')
    removeFromScene(meshType)
}


function removeFromScene(meshType) {
    if (meshType == 'cube') {
        gsap.to(
            cube.scale, {
            duration: .3,
            x: 0.01,
            y: 0.01,
            z: 0.01,
            onComplete: () => {
                console.log('removeFromSceneEnding')
                scene.remove(cube)
            }
        }
        )
    } else if (meshType == 'sphere') {
        gsap.to(sphere.scale, {
            duration: .3,
            x: 0.01,
            y: 0.01,
            z: 0.01,
            onComplete: () => {
                console.log('removeFromSceneEnding')
                scene.remove(sphere)
            }
        })
    }
}

// elementi menu
const menuElements = document.querySelectorAll('.rolling-text')

menuElements.forEach((element) => {

    let meshType = '';

    element.addEventListener("mouseenter", () => {
        meshType = element.dataset.mesh
        drawSomething(meshType)
    });

    element.addEventListener('mouseleave', (e) => {
        onMouseLeave(meshType)
    })
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.y += .05
    cube.rotation.z = .1
    renderer.render(scene, camera);
};


animate();