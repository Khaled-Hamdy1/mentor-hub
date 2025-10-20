"use client";

import type { MentoringSession } from "@prisma/client";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import { createMentoringSession } from "@/services/mentoring-session";

const CheckoutSuccessContent = () => {
  const searchParams = useSearchParams();
  const sessionData = Object.fromEntries(
    searchParams.entries()
  ) as unknown as MentoringSession;

  useEffect(() => {
    try {
      createMentoringSession({
        ...sessionData,
        duration: Number(sessionData.duration),
      });
      toast.success("Mentoring session created");
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md w-full rounded-xl bg-white p-8 text-center shadow-xl border border-darkblue">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-darkblue" />
        </div>
        <h1 className="font-bold text-3xl text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your mentoring session has been booked
          and is now available in your Learnings page.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/profile/my-learnings">
            <span className="block w-full rounded-md bg-darkblue px-4 py-3 text-white font-medium transition-colors hover:bg-blue-600">
              Go to My Learnings
            </span>
          </Link>
          <Link href="/">
            <span className="block w-full rounded-md bg-gray-100 px-4 py-3 text-gray-700 font-medium transition-colors hover:bg-gray-200">
              Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CheckoutSuccess = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
};

export default CheckoutSuccess;
