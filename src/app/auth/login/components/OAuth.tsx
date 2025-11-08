import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GITHUP, LINKEDIN } from "@/constants/icons";
import { GOOGLE } from "@/constants/images";
import { signInGithub, signInGoogle, signInLinkedIn } from "@/lib/auth-handler";

export default function OAuth() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <Button
        onClick={signInLinkedIn}
        className="flex items-center justify-center w-full sm:w-auto border border-darkblue px-6 py-2 rounded-lg text-black bg-transparent h-12"
      >
        LinkedIn
        <Image
          src={LINKEDIN}
          alt=""
          className="ml-2 w-6 sm:w-8 aspect-square"
        />
      </Button>
      <Button
        onClick={signInGoogle}
        className="flex items-center justify-center w-full sm:w-auto border border-darkblue px-6 py-2 rounded-lg text-black bg-transparent h-12"
      >
        Google
        <Image src={GOOGLE} alt="" className="ml-2 w-6 sm:w-8 aspect-square" />
      </Button>
      <Button
        onClick={signInGithub}
        className="flex items-center justify-center w-full sm:w-auto border border-darkblue px-6 py-2 rounded-lg text-black bg-transparent h-12"
      >
        Github
        <Image src={GITHUP} alt="" className="ml-2 w-6 sm:w-8 aspect-square" />
      </Button>
    </div>
  );
}
