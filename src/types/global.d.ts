interface Window {
	utils: {
		async setDisk(data: string): void
		getDisk(): string
		openExternal(href: string): void;
	}
}

declare const $_ENV: { name: string };
declare const $_PLATFORM: { name: string };
