export const ACCESS_TOKEN_COOKIE_NAME = "access_token";
export const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

export const ACCESS_TOKEN_COOKIE_OPTIONS: Cookies.CookieAttributes = {
	expires: new Date(Date.now() + 5 * 60 * 1000), //5 minutes
	secure: process.env.NODE_ENV === "production",
	sameSite: "Strict" as const,
	path: "/",
};

export const REFRESH_TOKEN_COOKIE_OPTIONS: Cookies.CookieAttributes = {
	expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), //1 days
	secure: process.env.NODE_ENV === "production",
	sameSite: "Strict" as const,
	path: "/",
};