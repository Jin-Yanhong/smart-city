import { RouteRecordRaw } from "vue-router";

export interface routeMapKeys {
	system: RouteRecordRaw[];
	flatMap: RouteRecordRaw[];
	reliefMap: RouteRecordRaw[];
	spaceModel: RouteRecordRaw[];
}

export interface featureType {
	id: number;
	name: string;
	LonLat: number[];
	icon: string;
	label: string;
}
