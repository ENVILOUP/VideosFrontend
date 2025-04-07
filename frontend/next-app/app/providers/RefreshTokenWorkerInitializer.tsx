import { useRefreshTokenWorker } from "../hooks/useAuthorization";

export default function RefreshTokenWorkerInitializer () {
	useRefreshTokenWorker();
	return null;
};