import type { User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const response = await fetch("/api/user");

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setUserError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, userLoading, userError };
};
