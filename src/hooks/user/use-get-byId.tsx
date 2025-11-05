import type { User } from "@prisma/client";
import { useRequest } from "ahooks";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

export type GetUserError = {
  status: number;
  message?: string;
  // errors?: {
  //   [key: string]: string[];
  // };
};

type GetUserResponse = {
  status: 200;
  message: "Success";
  data: User;
};

export const useGetUser = (id?: string) => {
  return useRequest(
    () => apiClient.get<GetUserError, GetUserResponse>(`/user/${id}`),
    {
      onError: (error) => {
        const err = error as unknown as GetUserError;
        console.log(err);
        if (err.message) {
          toast.error(err.message);
        }

        // if (err.errors) {
        //   Object.values(err.errors).forEach((errorList) => {
        //     errorList.forEach((errorMsg) => {
        //       toast.error(errorMsg);
        //     });
        //   });
        // }
      },
    }
  );
};
