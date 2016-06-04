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
	dynamicTexture.context.font	= "bolder 38px Verdana";
	// update the text
	dynamicTexture.clear('cyan');
	dynamicTexture.drawText("To Access PSAP Portal", undefined, 100, 'red');
	dynamicTexture.context.font	= "bolder 30px Verdana";
	dynamicTexture.drawText("Contact Mr. Gary Nestler", undefined, 220, 'red');
	dynamicTexture.drawText("Phone: 888-111-3333", undefined, 340, 'red');
	dynamicTexture.drawText("Email: gary@us.ibm.com", undefined, 460, 'red');
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