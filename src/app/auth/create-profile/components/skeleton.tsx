import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LOGIN } from "@/constants/images";

export default function CreateProfileSkeleton() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={LOGIN}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-darkblue/40 via-blue-600/30 to-purple-600/40" />
      </div>

      {/* Form Container with Backdrop Blur */}
      <div className="relative z-10 w-full max-w-2xl mx-4 my-8">
        <Card className="shadow-2xl border border-white/20 rounded-3xl backdrop-blur-xl bg-white/95">
          <CardHeader className="space-y-3 text-center pb-6 pt-8">
            <Skeleton className="h-10 w-3/4 mx-auto bg-darkblue/10" />
            <Skeleton className="h-6 w-2/3 mx-auto bg-gray-200" />
          </CardHeader>

          <CardContent className="px-8 pb-8 space-y-6">
            {/* Avatar Skeleton */}
            <div className="flex flex-col items-center space-y-3">
              <Skeleton className="h-28 w-28 rounded-full bg-blue-100" />
              <Skeleton className="h-4 w-48 bg-gray-200" />
            </div>

            {/* Name Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 bg-darkblue/20" />
              <Skeleton className="h-12 w-full rounded-xl bg-gray-100" />
            </div>

            {/* Gender Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-16 bg-darkblue/20" />
              <div className="flex gap-6">
                <Skeleton className="h-10 w-24 rounded-lg bg-blue-50" />
                <Skeleton className="h-10 w-28 rounded-lg bg-blue-50" />
              </div>
            </div>

            {/* Phone & Location Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 bg-darkblue/20" />
                <Skeleton className="h-12 w-full rounded-xl bg-gray-100" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-36 bg-darkblue/20" />
                <Skeleton className="h-12 w-full rounded-xl bg-gray-100" />
              </div>
            </div>

            {/* Job Title Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 bg-darkblue/20" />
              <Skeleton className="h-12 w-full rounded-xl bg-gray-100" />
            </div>

            {/* Date of Birth Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-28 bg-darkblue/20" />
              <Skeleton className="h-12 w-full rounded-xl bg-gray-100" />
            </div>

            {/* Skills Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16 bg-darkblue/20" />
              <Skeleton className="h-24 w-full rounded-xl bg-gray-100" />
              <Skeleton className="h-3 w-56 bg-gray-200" />
            </div>

            {/* Bio Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-36 bg-darkblue/20" />
              <Skeleton className="h-32 w-full rounded-xl bg-gray-100" />
            </div>

            {/* Mentoring Toggle Skeleton */}
            <Skeleton className="h-20 w-full rounded-xl bg-gradient-to-r from-blue-50 to-purple-50" />

            {/* Submit Button Skeleton */}
            <Skeleton className="h-14 w-full rounded-xl bg-darkblue/20" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
