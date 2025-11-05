import { User } from "lucide-react";
import Image from "next/image";
import { LOGIN } from "@/constants/images";

export default function AsidePanel() {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-8 space-y-6">
        <div className="rounded-xl bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <User className="h-6 w-6 text-slate-800" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                You're almost done
              </div>
              <div className="text-xs text-slate-500">
                Complete the fields to reach 100% profile
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs text-slate-600 mb-2">Tips to stand out</div>
            <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
              <li>Use a clear profile photo</li>
              <li>List 3–6 relevant skills</li>
              <li>Add a concise bio (3–4 sentences)</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden bg-white/60 border border-slate-100 shadow-sm">
          <Image
            src={LOGIN}
            alt="Illustration"
            width={380}
            height={220}
            priority={true}
            className="object-cover"
          />
        </div>
      </div>
    </aside>
  );
}
