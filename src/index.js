
import { WebGLRenderer, Color, PerspectiveCamera, Scene, SphereGeometry, MeshBasicMaterial, Mesh, AmbientLight, TextureLoader, NearestFilter, LinearMipMapLinearFilter } from "three";

const canvas = document.querySelector("canvas#c");


// RENDERER
const renderer = new WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight, false);



// SCENE
const scene = new Scene();

scene.background = new Color(0);

// Camera
const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.aspect = canvas.clientWidth / canvas.clientHeight;
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0)


// LIGHT
const light = new AmbientLight(0xffffff, 10);
scene.add(light);


// GEMOTERY
const geometry = new SphereGeometry(5, 32, 32);


// MATERAIL
const texLoader = new TextureLoader();
const tex = texLoader.load("globe.png");

tex.magFilter = NearestFilter;
tex.minFilter = LinearMipMapLinearFilter;
const material = new MeshBasicMaterial({
    map: tex
});

const sphere = new Mesh(geometry, material);
scene.add(sphere);


// ANIMATION
window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});


const animate = () => {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.0025;

    renderer.render(scene, camera);
};
animate();

renderer.render(scene, camera);
