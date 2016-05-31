function makeTextureByElement(html_container, obj, func)
{
	var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    var html = html_container.innerHTML;
    
    canvas.style.left=0;
	canvas.style.top=0;
	canvas.width = html_container.clientWidth;
	canvas.height = html_container.clientHeight + 10;
	
	rasterizeHTML.drawHTML(html).then(function (renderResult) {
	    context.drawImage(renderResult.image, 0, 0);
	    func.call(obj, canvas)
	});
}

function htmlTexture()
{
	this.preBuildElement = function(html){
		var canvas = makeTextureByElement(html, this, this.build);
	};
	
	this.build   = function(canvas) { 
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
		this.parent.add(meshB);
		this.root = meshB;
		//this.root.position.z = 50;
		
		if (this.onload !=undefined)
			this.onload.call(this);
	};
	
	this.addOnLoad = function (func)
	{
		this.onload = func;
		if (this.loaded != undefined)
			this.onload.call(this);
		
	};
}

function createTextureMaterial(text,func)
{
	var X = new htmlTexture();
	
	var fonts = '<STYLE> @font-face { font-family: "raleway"; src: url("fonts/raleway400.woff2") format("woff2") } </STYLE>';
	var style1 = '<STYLE>.rasterSettings {position:absolute;top:-1000px;left:-1000px} </STYLE>';
	var style2 = '<STYLE>.labelText02{background-color:#ffc000;padding:5px;font-family:raleway;display:inline-block;font-size:100px;margin-right:100px} </STYLE>';
	
	var H = $("<a>").html("<div>"+style1+"<div class='rasterSettings'>"+fonts+style2+"<div class='labelText02' >"+ text +"</div></div></div>").find("div");
	$('body').append(H[0]);
	
	X.preBuildElement(H[0].children[1]); 
	
	X.addOnLoad( func );
}