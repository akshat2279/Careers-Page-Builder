export const EMAIL_ADDRESS_VALIDATION =
	/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/i;

export const PASSWORD_REGEX =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;

export const ACCESS_TOKEN_KEY = "__ATK__";

export const LIST_RECORDS_LIMIT = 20;