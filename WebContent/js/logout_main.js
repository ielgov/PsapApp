var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.003;

function init() {
    scene = new THREE.Scene();

    initCube();
    initCamera();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 0.0, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initCube() {
	var geometry =  new THREE.BoxGeometry(2, 2, 2);
	
	
	var dynamicTexture	= new THREEx.DynamicTexture(512,512)
	dynamicTexture.context.font	= "bolder 60px Verdana";
	// update the text
	dynamicTexture.clear('cyan');
	dynamicTexture.drawText("Signing Out", undefined, 220, 'red');
	dynamicTexture.drawText("Please wait..", undefined, 350, 'red');
	var material	= new THREE.MeshBasicMaterial({
		map	: dynamicTexture.texture
	})
	
	cube = new THREE.Mesh(geometry,	material);
    scene.add(cube);
}

function rotateCube() {
    //cube.rotation.x -= SPEED * 2;
    cube.rotation.y -= SPEED;
    //cube.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    rotateCube();
    renderer.render(scene, camera);
}


init();
render();