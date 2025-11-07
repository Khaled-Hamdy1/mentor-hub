import { Gender } from "@prisma/client";
import {
  type FieldErrors,
  type UseFormSetValue,
  useFormContext,
} from "react-hook-form";
import type { CreateProfileForm } from "@/app/api/user/schema";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  setValue: UseFormSetValue<CreateProfileForm>;
  errors: FieldErrors<CreateProfileForm>;
};

export default function GenderPicker({ setValue, errors }: Props) {
  const { watch } = useFormContext<CreateProfileForm>();
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-800">Gender</Label>
      <RadioGroup
        value={watch("gender") || null}
        onValueChange={(value) => setValue("gender", value as Gender)}
        className="flex gap-2 h-12"
      >
        <div className="flex items-center gap-2 px-3 md:px-5 py-3 rounded-lg bg-slate-50 border border-slate-100">
          <RadioGroupItem value={Gender.MALE} id="male" />
          <Label htmlFor="male" className="text-sm">
            Male
          </Label>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
          <RadioGroupItem value={Gender.FEMALE} id="female" />
          <Label htmlFor="female" className="text-sm">
            Female
          </Label>
        </div>
      </RadioGroup>
      {errors.gender && (
        <p className="text-xs text-red-500">{errors.gender.message}</p>
      )}
    </div>
  );
}
