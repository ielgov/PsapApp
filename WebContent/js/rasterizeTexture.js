function makeTextureByElement(html_container, obj, func)
{
	console.log("Function :: makeTextureByElement");
	var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    //context.fillStyle = 'orange';
    var html = html_container.innerHTML;
    
    canvas.style.left=0;
	canvas.style.top=0;
	
	//canvas.width = html_container.clientWidth;
	//canvas.height = html_container.clientHeight + 10;
	
	canvas.width = html_container.clientWidth;
	canvas.height = html_container.clientHeight;
	
	//canvas.width = 512;
	//canvas.height = 512;
	
	rasterizeHTML.drawHTML(html).then(function (renderResult) {
	    context.drawImage(renderResult.image, 0, 0);
	    func.call(obj, canvas);
	    
	    var texture = new THREE.Texture(canvas);
	    texture.needsUpdate = true;
	    texture.minFilter = THREE.LinearFilter;
	    //texture.transparent = true;
	    
	    //cameraCube = new THREE.Mesh( new THREE.BoxGeometry( 3, 3, 3 ), new THREE.MeshBasicMaterial({ color: 0xFF00FF } ) );
	    
	    //var textMat = new THREE.MeshBasicMaterial({ color: 0xa5a8ab, map: texture/*, vertexColors: THREE.FaceColors*/ }) ;
	    var textMat = new THREE.MeshLambertMaterial({color: 0xff0000, map: texture});
	    cameraCube = new THREE.Mesh( new THREE.BoxGeometry( 3, 3, 3 ), textMat);
		cameraCube.position.set( -10, 0, 0);
		scene.add(cameraCube);
	});
}

function htmlTexture()
{
	this.rootCanvas = undefined;
	
	this.preBuildElement = function(html){
		//console.log("Function :: htmlTexture preBuildElement");
		var canvas = makeTextureByElement(html, this, this.buildNew);
		//var canvas = makeTextureByElement(html, this, this.build);
	};
	this.preBuildElementCanvas = function(html){
		//console.log("Function :: htmlTexture preBuildElementCanvas");
		var canvas = makeTextureByElementCanvas(html, this, this.buildNew);
	};
	
	this.buildNew = function(canvas){
		//console.log("Function :: htmlTexture buildNew");
		this.rootCanvas = canvas;
		
		if (this.onload !=undefined)
			this.onload.call(this);
	};
	
	this.build   = function(canvas) {
		//console.log("Function :: htmlTexture BUILD");
		this.rootCanvas = canvas;
		this.loaded = true;
		
		var vertShader = document.getElementById('vertex_shh').innerHTML;

		var fragShader = document.getElementById('fragment_shh').innerHTML;
	
		var attributes = { };
		
		var texture1 = new THREE.Texture(canvas);
		texture1.needsUpdate = true;
		texture1.minFilter=THREE.LinearFilter;
		//var texture2 = new THREE.ImageUtils.loadTexture( 'textures/2data.png' ) 
		var uniforms = {
				 inColor : { type: "v4", value: new THREE.Vector4( 0.1, 0.4, 0.5, 1 ) },
				  tSec: { type: "t", value: texture1 }

		};
		
		// var material2 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide} );
		//    material2.transparent = true;
		    
		var material1 = new THREE.ShaderMaterial({

			  uniforms: uniforms,
			  attributes: attributes,
			  vertexShader: vertShader,
			  fragmentShader: fragShader/*,
			  transparent:true*/
		});
		
		var meshB = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width/5, canvas.height/5), material1);
	//	texture1.needsUpdate = true;
		//meshB.material = material_shh;
		
		//this.parent.add(meshB);
		this.root = meshB;
		
		//this.root.position.z = 50;
		
		if (this.onload !=undefined)
			this.onload.call(this);
	};
	this.root     = undefined;
	this.addOnLoad = function (func)
	{
		//console.log("Function :: htmlTexture addOnLoad");
		this.onload = func;
		if (this.loaded != undefined)
			this.onload.call(this);
		
	};
	
}

function createTextureMaterial(text,func)
{
	console.log("Function :: createTextureMaterial");
	htmltexture = new htmlTexture();
	/*
	var fonts = '<STYLE> @font-face { font-family: "raleway"; src: url("fonts/raleway400.woff2") format("woff2") } </STYLE>';
	var style1 = '<STYLE>.rasterSettings {position:absolute;top:-1000px;left:-1000px} </STYLE>';
	var style2 = '<STYLE>.labelText02{background-color:#ffc000;padding:5px;font-family:raleway;display:inline-block;font-size:100px;margin-right:100px} </STYLE>';
	*/
	
	text = "Situation Awareness and Incident Response";
	//text = 'Contacts';
	var fonts = '<STYLE> @font-face { font-family: "helveticaneuelightwebfont"; src: url("fonts/helveticaneue-light-webfont.woff") format("woff"); } </STYLE>';
	var style1 = '<STYLE>.rasterSettings {position:absolute;top:0px;left:0px;width:512px;height:512px;background-color:green;} </STYLE>';
	var style2 = '<STYLE>.labelText{width:512px;height:512px;background-color:blue;color:white;font-size: 5rem;position:relative;display:-webkit-box;display:-moz-box;-webkit-box-align:center;-moz-box-align:center;-webkit-box-pack:center;-moz-box-pack:center;text-align:center;'
	+ 'padding:0px;font-family:helveticaneuelightwebfont;margin-right:0px} </STYLE>';
	
	var H = $("<a>").html("<div style='width:512px;height:512px;position:absolute;top:0px;background-color:red;'>"+style1+"<div class='rasterSettings'>"+fonts+style2+"<div class='labelText' >"+ text +"</div></div></div>").find("div");
	//var H = $("<a>").html("<div style='width:512px;height:512px;position:absolute;top:0px;background-color:#ff0000;'>"+style1+"<div class='rasterSettings'>"+fonts+style2+"<div class='labelText' ></div></div></div>").find("div");
	$('body').append(H[0]);
	htmltexture.htmlcontent = H;
	htmltexture.preBuildElement(H[0].children[1]); 
	
	htmltexture.addOnLoad( func );
}

/*createLabelTextureX1("&nbsp;&nbsp;&nbsp;VTL&nbsp;PREDICTIVE&nbsp;CUSTOMER&nbsp;INTELLIGENCE&nbsp;HQ&nbsp;", function() { 
	
	
	this.root.position.set(1180,160,-100);
	this.root.scale.multiplyScalar(.8);
	this.root.rotation.y=Math.radians(180);
	
});	*/

/*createTextureMaterial("Hello World!", function(){
	console.log("createTextureMaterial callback");
	console.log('this',this);
	$(this.htmlcontent).remove();
});*/

function createTextureMaterialCanvas(text,cubie,i,func)
{
	
	var htmltexture = new htmlTexture();
	
	var fonts = '<STYLE> @font-face { font-family: "helveticaneuelightwebfont"; src: url("fonts/helveticaneue-light-webfont.woff") format("woff"); } </STYLE>';
	var style1 = '<STYLE>.rasterSettings {position:absolute;top:0px;left:-1024px;width:1024px;height:1024px;background-color:green;} </STYLE>';
	var style2 = '<STYLE>.labelText{width:1024px;height:1024px;background-color:blue;color:white;font-weight:bold;font-size: 9rem;position:relative;display:-webkit-box;display:-moz-box;-webkit-box-align:center;-moz-box-align:center;-webkit-box-pack:center;-moz-box-pack:center;text-align:center;'
	+ 'padding:0px;font-family:helveticaneuelightwebfont;margin-right:0px} </STYLE>';
	
	var H = $("<a>").html("<div>"+style1+"<div class='rasterSettings'>"+fonts+style2+"<div class='labelText' >"+ text +"</div></div></div>").find("div");
	$('body').append(H[0]);
	htmltexture.htmlcontent = H;
	htmltexture.preBuildElementCanvas(H[0].children[1]);
	htmltexture.cubie = cubie;
	htmltexture.matIndex = i;
	//console.log("i",i);
	htmltexture.addOnLoad( func );
}

function makeTextureByElementCanvas(html_container, obj, func)
{
	var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    var html = html_container.innerHTML;
    
    canvas.style.left=0;
	canvas.style.top=0;
	
	//canvas.width = html_container.clientWidth;
	//canvas.height = html_container.clientHeight + 10;
	
	//console.log('html_container - width',html_container.clientWidth);
	//console.log('html_container - height',html_container.clientHeight);
	
	canvas.width = html_container.clientWidth;
	canvas.height = html_container.clientHeight;
	
	rasterizeHTML.drawHTML(html).then(function (renderResult) {
		//console.log('rasterize callback');
	    context.drawImage(renderResult.image, 0, 0);
	    func.call(obj, canvas);  	
	});
}


function drawShaderCube()
{
	console.log("Function :: drawShaderCube");
	
	/*var uniforms = {
	        diffuse: { type: "c", value: new THREE.Color(0xff0000) },
	        texture1: { type: "t", value: THREE.ImageUtils.loadTexture("images/svg/1024x1024/rubiksCubeText_commandAndControl.svg")}
    };*/
	
	/*var uniforms = {
			texture1: { type: "t", value: THREE.ImageUtils.loadTexture("images/svg/1024x1024/rubiksCubeText_commandAndControl.svg")}
    };*/
	
	var uniforms = {
			 inColor : { type: "v4", value: new THREE.Vector4( 0.1, 0.4, 0.5, 1 ) },
			  tSec: { type: "t", value: THREE.ImageUtils.loadTexture("images/svg/1024x1024/rubiksCubeText_commandAndControl.svg") }

	};
	
    var vertexShader = document.getElementById('vertexShader').text;
    var fragmentShader = document.getElementById('fragmentShader_3').text;
    material = new THREE.ShaderMaterial(
        {
          uniforms : uniforms,
          vertexShader : vertexShader,
          fragmentShader : fragmentShader,
        });
    cameraCube = new THREE.Mesh(new THREE.BoxGeometry( 3, 3, 3 ), material);
    cameraCube.position.set( -10, 0, 0);
    scene.add(cameraCube);
    
}

function svg2canvas(id, callback)
{
	var canvas = document.createElement('canvas');
	canvas.width = 1024;
	canvas.height = 1024;
	var ctx = canvas.getContext('2d');

	/*var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
	           '<foreignObject width="100%" height="100%">' +
	           '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
	             '<em>I</em> like ' + 
	             '<span style="color:white; text-shadow:0 0 2px blue;">' +
	             'cheese</span>' +
	           '</div>' +
	           '</foreignObject>' +
	           '</svg>';*/
	
	var DOMURL = window.URL || window.webkitURL || window;
	
	var img = new Image();
	img.width=1024;
	img.height=1024;
	var svg = new Blob([document.getElementById(id).innerHTML], {type: 'image/svg+xml;charset=utf-8'});
	var url = DOMURL.createObjectURL(svg);
	
	img.onload = function () {
	  ctx.drawImage(img, 0, 0);
	  DOMURL.revokeObjectURL(url);
	  console.log('done!');
	  console.log(this);
	  document.body.appendChild(canvas);
	  	callback(canvas);
	};
	
	img.src = url;
	
	/*svg2canvas('gap', function(canvas) {	
		
		pushTick( function() {
			var c= new JPA.cuboid3D(JPA.Globals.stages["stage1"].root);
			c.build('x', 10);
			c.root.position.set(600,300,-200);
			c.root.rotation.y = Math.radians(90);
			c.oneFaceCanvas(canvas, 0x002A5F);
			c.root.scale.multiplyScalar(2); 
			JPA.Globals.objects["gap"] = c;	
			JPA.Globals.loaded++;
		});
	});*/
	
	/*<div id="gap" style="xdisplay:none">
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
			<g>
				<g>
					<defs>
						<rect id="SVGID_1_" width="300" height="300.006"/>
					</defs>
					<clipPath id="SVGID_2_">
						<use xlink:href="#SVGID_1_" overflow="visible"/>
					</clipPath>
					<polygon clip-path="url(#SVGID_2_)" fill="#002A5F" points="149.997,0 0,0 0,150.003 0,300 149.997,300 300,300 300,150.003     300,0   "/>
					<path clip-path="url(#SVGID_2_)" fill="#FFFFFF" d="M215.544,77.491h6.216c5.879-0.006,8.609,5.475,8.609,9.62v64.514    c0.006,4.649-2.73,8.959-7.996,8.928h-6.829V77.491z M221.799,75.099h-24.727v2.392h6.543v145.018h-6.543v2.565h27.897v-2.565    h-9.426v-59.008h8.128c11.826,0,18.557-6.229,18.557-14.602V90.947C242.229,82.595,236.419,75.086,221.799,75.099"/>
					<path clip-path="url(#SVGID_2_)" fill="#FFFFFF" d="M90.922,77.024c0,2.392-1.395,2.212-2.513,1.427    c-4.017-2.821-8.942-4.85-13.341-4.817c-7.171,0.052-17.447,3.524-17.48,18.644v111.17c0.109,19.31,9.401,22.918,18.561,23.015    c7.131,0.068,10.526-3.697,13.411-4.954c1.522-0.664,3.187,0.872,3.187,3.725h2.961v-70.726h5.941v-2.378H76.557v2.378h7.279    v60.836c0,4.933-3.351,8.666-7.573,8.674c-4.067,0-7.183-3.863-7.183-8.674V87.858c-0.006-3.466,0.609-11.524,5.968-11.486    c10.316,0.077,15.792,30.245,15.868,45.851h2.961V75.016h-2.947L90.922,77.024z"/>
					<path clip-path="url(#SVGID_2_)" fill="#FFFFFF" d="M136.473,160.758l7.228-64.713l7.379,64.713H136.473z M151.382,163.405    l6.722,59.072h-6.607v2.564h24.828v-2.564h-6.542L153.287,75.066h-10.565l-15.324,139.225c-0.902,5.001-1.369,8.082-8.558,8.19    v2.561h18.618v-2.564c-5.269,0.004-7.655-3.365-7.137-6.946l5.853-52.126H151.382z"/>
				</g>
			</g>
		</svg>
	</div>*/
}

function testSVG()
{
	cameraCube = new THREE.Mesh( new THREE.BoxGeometry( 3, 3, 3 ), new THREE.MeshLambertMaterial({ color: 0xFF00FF, transparent:true, map: THREE.ImageUtils.loadTexture("images/svg/rubiksCubeText_commandAndControl.svg") }));
	cameraCube.position.set( -14, 7, -22);
	camera.add(cameraCube);
}