import { useMemo } from 'react';

import { Metadata } from 'next';
import Image from 'next/image';
import DropdownLanguage from '@components/app/DropdownLanguage';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

interface Props {
  page: 'sign-in' | 'sign-up';
  children: React.ReactNode;
}

export default function AuthLayout({ page, children }: Props) {
  const imageSrc = useMemo(() => {
    const images = {
      'sign-in': '/images/auth/signin.png',
      'sign-up': '/images/auth/signup.png',
    };

    return images[page];
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen p-8 bg-accent">
        <div className="fixed top-2 right-2">
          <DropdownLanguage />
        </div>
        <div className="rounded-lg bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-[1080px]">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full lg:block lg:w-1/2 text-center px-6 py-12">
              <Image
                src={imageSrc}
                width={564}
                height={473}
                alt="Rocket Nova illustration"
                className="mx-auto"
              />
            </div>

            <div className="flex w-full py-6 px-8 border-stroke dark:border-strokedark lg:w-1/2 lg:border-l-2">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
