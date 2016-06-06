var scene, camera, renderer, projector;

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
	dynamicTexture.drawText("Internal App Error", undefined, 100, 'red');
	dynamicTexture.context.font	= "bolder 30px Verdana";
	dynamicTexture.drawText("Report this error", undefined, 220, 'red');
	dynamicTexture.drawText("to PSAP support team", undefined, 280, 'red');
	dynamicTexture.drawText("At gscgov@us.ibm.com", undefined, 420, 'red');
	var material	= new THREE.MeshBasicMaterial({
		map	: dynamicTexture.texture
	})
	
	cube = new THREE.Mesh(geometry,	material);
	cube.userData = {
            URL: "/PSAP/index.html"
    };
	
	projector = new THREE.Projector();
    scene.add(cube);
 
    document.addEventListener('mousedown', onDocumentMouseDown, false);
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

function onDocumentMouseDown(event) {
    event.preventDefault();
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 -
        1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector.unproject(camera);
    //projector.unproject(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position)
        .normalize());
    var intersects = raycaster.intersectObject(cube);
    if (intersects.length > 0) {
        window.open(intersects[0].object.userData.URL, "_self");
    }
}

init();
render();