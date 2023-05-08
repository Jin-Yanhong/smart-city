import * as THREE from "three";

export class Background {
	constructor(scene) {
		this.scene = scene;
		this.url = "/src/components/Three/image/black-bg.png";

		this.init();
	}

	// 创建天空盒
	init() {
		// 创建一个纹理加载器
		const loader = new THREE.TextureLoader();

		const geometry = new THREE.SphereGeometry(5000, 32, 32);
		const material = new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			map: loader.load(this.url),
		});

		const sphere = new THREE.Mesh(geometry, material);

		sphere.position.copy({
			x: 0,
			y: 0,
			z: 0,
		});

		this.scene.add(sphere);
	}
}
