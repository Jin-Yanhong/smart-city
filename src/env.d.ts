/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_API: string;
	readonly VITE_PUBLIC_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
