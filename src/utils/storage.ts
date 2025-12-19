import SecureLS from "secure-ls";

let ls: SecureLS | null = null;

const getSecureLS = (): SecureLS | null => {
	if (typeof window === "undefined") return null;
	
	if (!ls) {
		ls = new SecureLS();
	}
	
	return ls;
};

const storage = {
	set: (key: string, data: unknown): void => {
		const secureLS = getSecureLS();
		if (secureLS) {
			secureLS.set(key, data);
		}
	},

	get: (key: string) => {
		const secureLS = getSecureLS();
		return secureLS ? secureLS.get(key) : null;
	},

	remove: (key: string): void => {
		const secureLS = getSecureLS();
		if (secureLS) {
			secureLS.remove(key);
		}
	},

	removeAll: (): void => {
		const secureLS = getSecureLS();
		if (secureLS) {
			secureLS.removeAll();
		}
	},

	clear: (): void => {
		const secureLS = getSecureLS();
		if (secureLS) {
			secureLS.clear();
		}
	},

	getAllKeys: (): string[] => {
		const secureLS = getSecureLS();
		return secureLS ? secureLS.getAllKeys() : [];
	},
};

export default storage;
