import { color } from "../color/index";
import { Cylinder } from "./cylinder.js";

export class Wall {
	constructor(scene, time) {
		this.config = {
			radius: 50,
			height: 50,
			open: true,
			color: color.wall,
			opacity: 0.6,
			position: {
				x: 0,
				y: 0,
				z: 0,
			},
			speed: 1.0,
		};

		new Cylinder(scene, time).createCylinder(this.config);
	}
}
