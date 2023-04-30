/**
 * color from `src/assets/style/variable.less`
 */
const themeColor = "#487eb0";
const colorActive = "#fbc531";
const colorLight = "#f5f6fa";

const settings = {
	appConfig: {
		name: "智慧城市",
		themeColor: themeColor,
		activeColor: colorActive,
		copyright: "<a href=mailto:jin-yanhong@outlook.com>@Jin-Yanhong</a>",
		layOut: {
			maxWidth: "200px",
			minWidth: "64px",
		},
	},
	menuConfig: {
		uniqueOpened: false,
		collapseTransition: true,
		backgroundColor: themeColor,
		textColor: colorLight,
		activeTextColor: colorActive,
	},
};

export default settings;
