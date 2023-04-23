import XYZ from "ol/source/XYZ";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/WebGLTile";
import { Fill, Style, Icon, Text } from "ol/style.js";
import { Overlay, Feature } from "ol";
import { Point } from "ol/geom";
import { featureType } from "@/interface/index";

/**
 * 地图实例
 * @param dom HTMLElement
 * @returns ol.Map instance
 */
export function initMap(dom: HTMLElement): Map {
	const map = new Map({
		target: dom, // 关联到对应的div容器
		layers: [
			new TileLayer({
				source: new XYZ({
					url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
				}),
			}),
		],
		// 视图
		view: new View({
			// 地图视图
			projection: "EPSG:3857", // 墨卡托投影
			center: [-27117702.709166624, 4852658.966904737],
			zoom: 14,
			minZoom: 12,
			maxZoom: 16,
		}),
		controls: [],
	});
	return map;
}

/**
 * 覆盖物实例
 * @param id id of overlay instance
 * @param dom HTMLElement
 * @param className HTMLElement class attribute
 * @returns ol.Overlay instance
 */
export function overlayIns(id: number, dom: HTMLDivElement, className: string[] = []): Overlay {
	const Ins = new Overlay({
		id: id,
		element: dom,
		position: [-27117702.709166624, 4852658.966904737],
		autoPan: true,
		className: [...className, "overlayIns"].join(" "),
	});
	return Ins;
}

/**
 * 标记点实例
 * @param featureOption config the feature instance
 * @returns ol.Feature instance
 */
export function markerIns(featureOption: featureType): Feature {
	let featureIns = new Feature({
		id: featureOption.id,
		geometry: new Point(featureOption.LonLat), // 显示经纬度坐标
		name: featureOption.label, //名称属性
	});

	//设置点要素样式
	featureIns.setStyle(
		new Style({
			image: new Icon({
				crossOrigin: "anonymous",
				src: featureOption.icon || "",
				scale: 0.18,
			}),
			// 给标记点添加 文字介绍
			text: new Text({
				font: "14px Microsoft YaHei",
				text: featureOption.label,
				offsetY: 40,
				backgroundFill: new Fill({ color: "#66C4D5" }),
				fill: new Fill({ color: "#ffffff" }),
				padding: [1, 4, 1, 4],
			}),
		})
	);
	return featureIns;
}
