import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CreateProfileForm } from "../../../api/profile/schema";

export default function Header() {
  const { watch } = useFormContext<CreateProfileForm>();
  return (
    <CardHeader className="bg-gradient-to-r from-white/30 to-white/10 px-8 pt-8 pb-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-amber-50 to-pink-50 shadow-sm">
            <Sparkles className="h-6 w-6 text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Welcome to Mentor Hub</p>
            <CardTitle className="mt-1 text-2xl sm:text-3xl font-extrabold text-darkblue">
              Hi, {watch("name")} — we&apos;re so glad you&apos;re here
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-slate-600 max-w-2xl">
              A few quick details will help people find and connect with you.
              We&apos;ll keep this short — you can always update it later.
            </CardDescription>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-darkblue shadow-sm">
            New account
          </div>
          <div className="text-xs text-gray-500">Profile progress</div>
          <div className="ml-auto w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-darkblue to-blue-500"
              style={{ width: "30%" }}
            />
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
