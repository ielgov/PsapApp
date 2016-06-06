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