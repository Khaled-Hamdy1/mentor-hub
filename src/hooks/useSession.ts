"use client";

import type { Session, User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type SessionData = {
  user: User;
  session: Session;
};

export const useSession = () => {
  const [data, setData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSession = useCallback(async (signal?: AbortSignal) => {
    if (signal?.aborted) return null;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = (await authClient.getSession()) as {
        data: SessionData | null;
        error: unknown;
      };
      if (signal?.aborted) return null;

      if (error) {
        setError(new Error(error.toString()));
        return;
      } else if (!data) {
        setError(new Error("No session available"));
        return;
      } else {
        setData(data);
      }
    } catch (e: unknown) {
      if (signal?.aborted) return null;
      const msg = (e as Error)?.message ?? String(e);
      setData(null);
      setError(new Error(msg));
      return;
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchSession(controller.signal);
    return () => controller.abort();
  }, [fetchSession]);

  const refetch = useCallback(async () => {
    const controller = new AbortController();
    return fetchSession(controller.signal);
  }, [fetchSession]);

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
};
