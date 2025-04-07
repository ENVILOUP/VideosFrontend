import Cookies from "js-cookie"
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "../config/authConfig"

export const getRefreshToken = (): string | undefined => {
	return Cookies.get(REFRESH_TOKEN_COOKIE_NAME);
}

export const isRefreshTokenExist = (): boolean => {
	return !!getRefreshToken();
}

export const getAccessToken = (): string | undefined => {
	return Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
}

export const isAccessTokenExist = (): boolean => {
	return !!getAccessToken();
}