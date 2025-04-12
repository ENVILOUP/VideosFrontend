import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  ILoginErrorResponse,
  ILoginRequest,
  ILoginSuccessResponse,
  IRefreshErrorResponse,
  IRefreshSuccessTokenResponse,
  IRefreshTokenRequest,
  IRegisterErrorResponse,
  IRegisterRequest,
  IRegisterSuccessResponse,
} from "../types/IAuthorization";
import { authorizationApi } from "../api/authorization";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "../config/authConfig";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../stores/authStore";

export const useLogin = (): UseMutationResult<
  ILoginSuccessResponse,
  ILoginErrorResponse,
  ILoginRequest
	> => {
	const { setAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: (data: ILoginRequest) => authorizationApi.login(data),
    onSuccess: (data) => {
      console.log(data.data);
      Cookies.set(
        ACCESS_TOKEN_COOKIE_NAME,
        data.data.accessToken,
        ACCESS_TOKEN_COOKIE_OPTIONS
      );
      Cookies.set(
        REFRESH_TOKEN_COOKIE_NAME,
        data.data.refreshToken,
        REFRESH_TOKEN_COOKIE_OPTIONS
			);

			setAuthenticated(true);
    },
    onError: (error) => {
			console.error(error);
    },
  });
};

export const useRegister = (): UseMutationResult<
  IRegisterSuccessResponse,
  IRegisterErrorResponse,
  IRegisterRequest
> => {
  return useMutation({
    mutationFn: (data: IRegisterRequest) => authorizationApi.register(data),
    onSuccess: (data: IRegisterSuccessResponse) => {
      console.log(data.data);
    },
    onError: (error: IRegisterErrorResponse) => {
      console.error(error);
    },
  });
};

export const useRefreshToken = (): UseMutationResult<
  IRefreshSuccessTokenResponse,
  IRefreshErrorResponse,
  IRefreshTokenRequest
	> => {
	const { setAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: (data: IRefreshTokenRequest) =>
      authorizationApi.refreshToken(data),
    onSuccess: (data) => {
      console.log(data.data);
      Cookies.set(
        ACCESS_TOKEN_COOKIE_NAME,
        data.data.accessToken,
        ACCESS_TOKEN_COOKIE_OPTIONS
      );
      Cookies.set(
        REFRESH_TOKEN_COOKIE_NAME,
        data.data.refreshToken,
        REFRESH_TOKEN_COOKIE_OPTIONS
			);
			
			setAuthenticated(true);
    },
    onError: (error) => {
			console.error(error);
			setAuthenticated(false);
    },
  });
};

export const useLogout = () => {
	const { setAuthenticated } = useAuthStore();

	return useMutation({
		mutationFn: () => authorizationApi.logout(),
		onSuccess: (response) => {
			Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
			Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
			setAuthenticated(false);

			console.log(response);
		},
		onError: (error) => {
			console.error(error);
		},
	});
}

export const useRefreshTokenWorker = () => {
	const refreshMutation = useRefreshToken();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startWorker = () => {
    if (intervalRef.current) return;

    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE_NAME);

    if (!refreshToken) return;

    const refresh = () => {
			refreshMutation.mutate({ refreshToken });
			console.log("Refreshing token...");
    };

    refresh();

    intervalRef.current = setInterval(refresh, 5 * 60 * 1000); // 5 minutes
  };

  const stopWorker = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
			intervalRef.current = null;
    }
  };

  useEffect(() => {
    startWorker();

    return () => {
      stopWorker();
    };
  }, []);

  return {
    startWorker,
    stopWorker,
  };
};
