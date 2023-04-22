import XYZ from "ol/source/XYZ";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/WebGLTile";
import { Overlay } from "ol";

export function initMap(dom: HTMLElement): Map {
	const map = new Map({
		target: dom, // 关联到对应的div容器
		layers: [
			new TileLayer({
				source: new XYZ({
					url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
				}),
			}),
		],
		// 视图
		view: new View({
			// 地图视图
			projection: "EPSG:3857", // 墨卡托投影
			center: [-27117702.709166624, 4852658.966904737],
			zoom: 8,
			minZoom: 1,
			maxZoom: 16,
		}),
	});
	return map;
}

function myOverlay(dom: HTMLDivElement): Overlay {
	const myOverlay = new Overlay({
		id: "",
		element: dom,
		position: [-27117702.709166624, 4852658.966904737],
		autoPan: true,
		className: "",
	});
	return myOverlay;
}

export { myOverlay };
