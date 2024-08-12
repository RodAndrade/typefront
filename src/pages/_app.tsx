import '@assets/styles/globals.css';

import { Montserrat } from 'next/font/google';
import { cn } from '@utils/classname';

import { Toaster } from '@components/ui/toaster';
import { ThemeProvider } from '@components/theme';

import { AppProvider } from '@contexts/app';
import { DefaultPropsWithChildren } from '@app/types/generic';
import { AppProps } from 'next/app';

const montserrat = Montserrat({ subsets: ['latin'] });

interface Props extends AppProps {
  pageProps: DefaultPropsWithChildren;
}

const MyApp = ({ Component, pageProps }: Props) => {
  return (
    <AppProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className={cn(montserrat.className, 'min-h-screen')}>
          <Component {...pageProps} />
        </div>

        <Toaster />
      </ThemeProvider>
    </AppProvider>
  );
};

export default MyApp;
