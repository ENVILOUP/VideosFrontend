export interface IRegisterRequest {
	username: string,
	email: string,
	password: string,
}

export interface ILoginRequest {
	username: string,
	password: string,
}

export interface IRegisterSuccessResponse {
	success: boolean,
	data: string,
	status_code: number,
}

export interface IRegisterErrorResponse {
	success: boolean,
	status_code: number,
}

export interface ILoginSuccessResponse {
	success: boolean,
	data: {
		accessToken: string,
		refreshToken: string,
	},
	status_code: number,
}

export interface ILoginErrorResponse {
	success: boolean,
	status_code: number,
}

export interface IRefreshTokenRequest {
	refreshToken: string,
}

export type IRefreshSuccessTokenResponse = ILoginSuccessResponse
export type IRefreshErrorResponse = ILoginErrorResponse

export interface ILogoutSuccessResponse {
	success: boolean,
	data: string,
	status_code: number,
}

export type ILogoutErrorResponse = ILoginErrorResponse