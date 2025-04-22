"use client";

import { AuthDialog } from "./AuthDialog";
import { useAuthStore } from "@/app/stores/authStore";
import { useEffect, useState } from "react";
import AuthenticatedMenu from "./AuthenticatedMenu";

export default function AuthSection() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

	return (
    <>
      {!isAuthenticated ? (
        <AuthDialog />
			) : (
				<AuthenticatedMenu />
      )}
    </>
  );
}