
var canvas = document.getElementById("canvas");
var g = canvas.getContext("2d");

var shading_buffer = document.createElement("canvas")
shading_buffer.width = 500
shading_buffer.height = 500
var gb = shading_buffer.getContext("2d")

var background_color = "#FFB6C1"
g.fillStyle = background_color;

var params = { 
	width: 500, 
	height: 500,
	icon: new Image(),
	icon_spacing: 130,
	layers: 3,
	level_spacing: 5,
	icon_res: "flower"
}

var time = 0

function icon(x, y, l) {
	this.x = x * params.icon_spacing + l * params.level_spacing
	this.y = y * params.icon_spacing + l * params.level_spacing
	this.offset_x = 1 * (l/2)
	this.offset_y = 1 * (l/3)
	this.size = 35 + 5 * l
	this.lvl = l
}

var iconsTop = new Array()
var iconsMiddle = new Array()
var iconsBottom = new Array()

var icons = [iconsTop, iconsMiddle, iconsBottom]

for(var i = 0; i < (params.width/params.icon_spacing); i++) {
	for(var j = 0; j < (params.height/params.icon_spacing); j++) {
		iconsTop.push(new icon(i, j, 1))
		iconsMiddle.push(new icon(i, j, 2))
		iconsBottom.push(new icon(i, j, 3))
	}
}

params.icon.src = "res/"+params.icon_res+".png"

run(g)

function run(g) {
	time++
	update()
	draw(g)
	setTimeout(function() {
		run(g)
	}, 17)
}

function update() {
	for(var i = 0; i < icons.length; i++) {
		for(var j = 0; j < iconsTop.length; j++) {
			var icon = icons[i][j]
			icon.x += icon.offset_x + Math.sin(time/10)
			icon.y += icon.offset_y - Math.cos(time/10)

			if(icon.x > params.width)
				icon.x -= params.width + icon.size
			if(icon.y  > params.height)
				icon.y -= params.height + icon.size
		}
	}
}

function draw(g) {
	gb.clearRect(0,0,params.width,params.height)
	g.fillRect(0,0,params.width,params.height);
	for(var i = 0; i < params.layers; i++) {
		gb.globalAlpha=0.2
		gb.globalCompositeOperation = 'source-atop';
		gb.fillRect(0,0,params.width,params.height)

		gb.globalAlpha=1
		gb.globalCompositeOperation = 'normal';
		for(var j = 0; j < icons[i].length; j++) {
			gb.drawImage(params.icon, icons[i][j].x, icons[i][j].y, icons[i][j].size, icons[i][j].size)
		}

	}
	g.drawImage(shading_buffer,0,0)
}