'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";

export default function Header() {

    const router = useRouter();
    return (
        <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex gap-2 sm:gap-3 items-center mx-2 sm:mx-5">
                <div className="flex-none">
                    <Image
                        src="/BakanAI_full_logo_transparent_svg.svg"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-20 sm:w-24 md:w-[100px] h-auto"
                    />
                </div>
                <div className="flex-grow"></div>
                <div className="flex gap-1 sm:gap-2">
                    <Button variant="transparent" className="text-sm sm:text-base md:text-lg px-2 sm:px-4" >
                        Sign In
                    </Button>
                    <Button variant="white" className="text-xs sm:text-sm px-3 sm:px-4" onClick={ () => router.push('/dashboard')}>
                        Get Started
                    </Button>
                </div>

            </div>
        </nav>
    );
}