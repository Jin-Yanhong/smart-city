import { createI18n } from 'vue-i18n';
import type { I18n } from 'vue-i18n';
import { WritableComputedRef } from 'vue';
import { numberFormats } from './formats/numberFormats';
import { dateTimeFormats } from './formats/dateTimeFormats';

import en from './locales/en.json';
import zh from './locales/zh.json';

const i18n: I18n = createI18n({
	// locale: 'zh',
	fallbackLocale: 'en',
	dateTimeFormats,
	numberFormats,
	messages: {
		en: en,
		zh: zh,
	},
});

function setI18nLanguage(locale: string | WritableComputedRef<string>) {
	if (i18n.mode === 'legacy') {
		i18n.global.locale = locale;
	} else {
		(i18n.global.locale as any).value = locale;
	}
	// axios.defaults.headers.common['Accept-Language'] = locale;
	// (document.querySelector('html') as HTMLElement).setAttribute('lang', locale);
}

export { i18n, setI18nLanguage };
