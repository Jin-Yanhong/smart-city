import { loadFBX } from "../utils";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

import { SurroundLine } from "../effect/surroundLine.js";
import { Background } from "../effect/background.js";
import { Radar } from "../effect/radar.js";
import { Wall } from "../effect/wall.js";
import { Circle } from "../effect/circle.js";
import { Ball } from "../effect/ball.js";
import { Cone } from "../effect/cone.js";
import { Fly } from "../effect/fly.js";
import { Road } from "../effect/road.js";
import { Font } from "../effect/font.js";
import { Snow } from "../effect/snow.js";
import { Rain } from "../effect/rain.js";
import { Smoke } from "../effect/smoke.js";

export class City {
	constructor(scene, camera, controls) {
		this.scene = scene;
		this.camera = camera;
		this.controls = controls;

		this.tweenPosition = null;
		this.tweenRotation = null;

		this.height = {
			value: 5,
		};

		this.top = {
			value: 0,
		};
		this.flag = false;

		this.time = {
			value: 0,
		};

		this.effect = {};

		this.loadCity();
	}

	loadCity() {
		// 加载模型，并且渲染到画布上
		loadFBX("/src/components/Three/model/beijing.fbx").then(object => {
			object.traverse(child => {
				if (child.isMesh) {
					new SurroundLine(this.scene, child, this.height, this.time);
				}
			});

			this.initEffect();
		});
	}

	initEffect() {
		new Background(this.scene);

		new Radar(this.scene, this.time);

		new Wall(this.scene, this.time);

		new Circle(this.scene, this.time);

		new Ball(this.scene, this.time);

		new Cone(this.scene, this.top, this.height);

		new Fly(this.scene, this.time);

		new Road(this.scene, this.time);

		new Font(this.scene);

		// this.effect.snow = new Snow(this.scene);

		// this.effect.rain = new Rain(this.scene);

		this.effect.smoke = new Smoke(this.scene);

		// 添加点击选择
		this.addClick();

		this.addWheel();
	}

	// 让场景跟随鼠标的坐标进行缩放
	addWheel() {
		const body = document.body;
		body.onmousewheel = event => {
			const value = 30;

			// 鼠标当前的坐标信息
			const x = (event.clientX / window.innerWidth) * 2 - 1;
			const y = -(event.clientY / window.innerHeight) * 2 + 1;

			const vector = new THREE.Vector3(x, y, 0.5);

			vector.unproject(this.camera);
			vector.sub(this.camera.position).normalize();

			if (event.wheelDelta > 0) {
				this.camera.position.x += vector.x * value;
				this.camera.position.y += vector.y * value;
				this.camera.position.z += vector.z * value;

				this.controls.target.x += vector.x * value;
				this.controls.target.y += vector.y * value;
				this.controls.target.z += vector.z * value;
			} else {
				this.camera.position.x -= vector.x * value;
				this.camera.position.y -= vector.y * value;
				this.camera.position.z -= vector.z * value;

				this.controls.target.x -= vector.x * value;
				this.controls.target.y -= vector.y * value;
				this.controls.target.z -= vector.z * value;
			}
		};
	}

	addClick() {
		const canvas = document.querySelector(`[class="threeContainer"]`);
		let flag = true;
		// document.onmousedown = () => {
		// 	flag = true;

		// 	document.onmousemove = () => {
		// 		flag = false;
		// 	};
		// };

		// document.onmouseup = event => {
		// 	if (flag) {
		// 		this.clickEvent(event);
		// 	}
		// 	document.onmousemove = null;
		// };
		canvas.onmousedown = () => {
			flag = true;

			canvas.onmousemove = () => {
				flag = false;
			};
		};

		canvas.onmouseup = event => {
			if (flag) {
				// this.clickEvent(event);
			}
			canvas.onmousemove = null;
		};
	}

	clickEvent(event) {
		// 获取到浏览器坐标
		const x = (event.clientX / window.innerWidth) * 2 - 1;
		const y = -(event.clientY / window.innerHeight) * 2 + 1;

		// 创建设备坐标（三维）
		const standardVector = new THREE.Vector3(x, y, 0.5);

		// 转化为世界坐标
		const worldVector = standardVector.unproject(this.camera);

		// 做序列化
		const ray = worldVector.sub(this.camera.position).normalize();

		// 如何实现点击选中
		// 创建一个射线发射器，用来发射一条射线
		const raycaster = new THREE.Raycaster(this.camera.position, ray);

		// 返回射线碰撞到的物体
		const intersects = raycaster.intersectObjects(this.scene.children, true);

		let point3d = null;
		if (intersects.length) {
			point3d = intersects[0];
		}

		if (point3d) {
			const proportion = 3;
			// 开始动画来修改观察点
			const time = 1000;

			this.tweenPosition = new TWEEN.Tween(this.camera.position)
				.to(
					{
						x: point3d.point.x * proportion,
						y: point3d.point.y * proportion,
						z: point3d.point.z * proportion,
					},
					time
				)
				.start();
			this.tweenRotation = new TWEEN.Tween(this.camera.rotation)
				.to(
					{
						x: this.camera.rotation.x,
						y: this.camera.rotation.y,
						z: this.camera.rotation.z,
					},
					time
				)
				.start();
		}
	}

	start(delta) {
		for (const key in this.effect) {
			this.effect[key] && this.effect[key].animation();
		}

		if (this.tweenPosition && this.tweenRotation) {
			this.tweenPosition.update();
			this.tweenRotation.update();
		}

		this.time.value += delta;

		this.height.value += 0.4;
		if (this.height.value > 160) {
			this.height.value = 5;
		}

		// if (this.top.value > 15 || this.top.value < 0) {
		// 	this.flag = !this.flag;
		// }
		this.top.value += this.flag ? -0.8 : 0.8;
	}
}
