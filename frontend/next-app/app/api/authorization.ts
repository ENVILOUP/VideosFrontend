import { getAccessToken, isAccessTokenExist } from "../functions/auth";
import {
  ILoginErrorResponse,
  ILoginRequest,
  ILoginSuccessResponse,
  ILogoutSuccessResponse,
  IRefreshSuccessTokenResponse,
  IRefreshTokenRequest,
  IRegisterErrorResponse,
  IRegisterRequest,
  IRegisterSuccessResponse,
} from "../types/IAuthorization";

class AuthorizationApi {
  private readonly baseUrl = "http://auth.api.enviloup.localhost/api/Auth";

  register = async (
    data: IRegisterRequest
  ): Promise<IRegisterSuccessResponse> => {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData: IRegisterErrorResponse = await response
        .json()
        .catch(() => ({
          success: false,
          status_code: response.status,
          message: `Failed to register user: ${response.status}`,
        }));
      throw errorData;
    }
    return response.json();
  };

  login = async (data: ILoginRequest): Promise<ILoginSuccessResponse> => {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData: ILoginErrorResponse = await response
        .json()
        .catch(() => ({
          success: false,
          status_code: response.status,
          message: `Failed to login user: ${response.status}`,
        }));
      throw errorData;
    }
    return response.json();
  };

  refreshToken = async (
    data: IRefreshTokenRequest
  ): Promise<IRefreshSuccessTokenResponse> => {
    const response = await fetch(`${this.baseUrl}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData: ILoginErrorResponse = await response
        .json()
        .catch(() => ({
          success: false,
          status_code: response.status,
          message: `Failed to refresh token: ${response.status}`,
        }));
      throw errorData;
    }
    return response.json();
  };

	logout = async (): Promise<ILogoutSuccessResponse> => {
		const accessToken = getAccessToken();

		if (!isAccessTokenExist()) {
			throw {
				success: false,
				status_code: 401,
				message: "You are not logged in",
			};
		}

		const response = await fetch(`${this.baseUrl}/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			const errorData: ILoginErrorResponse = await response
				.json()
				.catch(() => ({
					success: false,
					status_code: response.status,
					message: `Failed to logout user: ${response.status}`,
				}));
			throw errorData;
		}
		return response.json();
	};
}

export const authorizationApi = new AuthorizationApi();
