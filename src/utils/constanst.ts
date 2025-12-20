export const EMAIL_ADDRESS_VALIDATION =
	/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/i;

export const PASSWORD_REGEX =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;

export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const ACCESS_TOKEN_KEY = "__ATK__";

export const LIST_RECORDS_LIMIT = 20;