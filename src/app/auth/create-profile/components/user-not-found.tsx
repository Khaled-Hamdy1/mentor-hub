import { AlertCircle, Home, UserX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LOGIN } from "@/constants/images";

export default function UserNotFound() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-orange-500/20 to-purple-600/30" />
      </div>

      {/* Error Card */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <Card className="shadow-2xl border border-white/20 rounded-3xl backdrop-blur-xl bg-white/95">
          <CardHeader className="space-y-4 text-center pb-6 pt-10">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-red-100 to-orange-100 p-6 rounded-full">
                  <UserX className="h-16 w-16 text-red-600" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-red-600">
              User Not Found
            </CardTitle>
            <CardDescription className="text-base text-gray-700 font-medium">
              We couldn't find a user with this ID. The link may be invalid or
              expired.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8 space-y-6">
            {/* Info Box */}
            <div className="flex items-start gap-4 p-5 bg-amber-50 rounded-xl border-2 border-amber-200">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-amber-900">
                  What you can do:
                </p>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                  <li>Check if the URL is correct</li>
                  <li>Request a new registration link</li>
                  <li>Contact support if the problem persists</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/auth/register" className="block">
                <Button className="w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-darkblue to-blue-600 hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  Register New Account
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-semibold rounded-xl border-2 border-darkblue/20 hover:bg-blue-50 hover:border-darkblue transition-all"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <p className="text-center text-sm text-gray-600">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-darkblue font-semibold hover:underline"
              >
                Contact Support
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
