import * as THREE from "three";
import { City } from "./city";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const initCity = (container: HTMLCanvasElement) => {
	// 创建场景
	const scene = new THREE.Scene();

	// 创建相机
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
	camera.position.set(1000, 500, 100);
	scene.add(camera);

	// 添加相机控件
	const controls = new OrbitControls(camera, container);
	// 是否有惯性
	controls.enableDamping = true;
	// 是否可以缩放
	controls.enableZoom = false;
	// 最近和最远距离
	controls.minDistance = 100;
	controls.maxDistance = 2000;
	// 开启右键拖动
	controls.enablePan = true;

	// 添加灯光
	scene.add(new THREE.AmbientLight(0xadadad));
	const directionLight = new THREE.DirectionalLight(0xffffff);
	directionLight.position.set(0, 0, 0);
	scene.add(directionLight);

	// 创建渲染器

	const renderer = new THREE.WebGLRenderer({ canvas: container });
	renderer.setSize(window.innerWidth, window.innerHeight);
	// 设置像素比
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	// 设置场景颜色
	renderer.setClearColor(new THREE.Color(0x000000), 1);

	const city = new City(scene, camera, controls);

	const clock = new THREE.Clock();

	const start = () => {
		city.start(clock.getDelta());

		controls.update();

		// 渲染场景
		renderer.render(scene, camera);

		requestAnimationFrame(start);
	};

	start();

	window.addEventListener("resize", () => {
		// 更新宽高比
		camera.aspect = window.innerWidth / window.innerHeight;
		// 更新相机的投影矩阵
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
		// 设置像素比
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});
};
