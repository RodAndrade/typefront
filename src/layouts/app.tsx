import { CSSProperties, PropsWithChildren, ReactNode, useEffect } from 'react';

import Sidebar from '@components/app/Sidebar';
import { useApp } from '@hooks/app';
import { cn } from '@utils/classname';
import { Button } from '@components/ui/button';
import { MdOutlineViewSidebar } from 'react-icons/md';
import { UserDropdown } from '@components/app/UserDropdown';

type AppLayoutProps = PropsWithChildren<{
  title?: string;
  description?: string;
  appendPageTitle?: ReactNode;
  classes?: {
    root?: string;
    main?: string;
    header?: string;
    section?: string;
  };
  styles?: {
    root?: CSSProperties;
    main?: CSSProperties;
    header?: CSSProperties;
    section?: CSSProperties;
  };
}>;

export default function AppLayout({
  title,
  description,
  appendPageTitle,
  classes,
  styles,
  children,
}: AppLayoutProps) {
  const { sidebarOpen, setSidebarOpen, getUserProfile } = useApp();

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div
      className={cn(
        'min-h-screen flex bg-[#FBF9F9] dark:bg-[#0C1538]',
        {
          'sidebar-hidden': !sidebarOpen,
        },
        classes?.root,
      )}
      style={styles?.root}
    >
      <Sidebar />
      <main
        className={cn(
          'flex-1 overflow-hidden',
          {
            // 'hidden md:block': sidebarOpen,
            'main-w-full': sidebarOpen,
            'w-full': !sidebarOpen,
          },
          classes?.main,
        )}
        style={styles?.main}
      >
        <header
          className={cn(
            'py-4 px-6 h-20 flex items-center justify-between bg-background dark:bg-[#111B44]',
            classes?.header,
          )}
          style={styles?.header}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="p-1"
              onClick={() => setSidebarOpen((state) => !state)}
            >
              <MdOutlineViewSidebar
                size={24}
                className="text-gray-700 dark:text-white"
              />
            </Button>
          </div>

          <UserDropdown />
        </header>
        <section
          className={cn('py-4 px-6', classes?.section)}
          style={{
            minHeight: 'calc(100vh - 70px)',
            overflow: 'auto',
            ...styles?.section,
          }}
        >
          <div className="flex justify-between items-center w-full mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {!!description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>

            {appendPageTitle}
          </div>
          <div className="w-full">{children}</div>
        </section>
      </main>
    </div>
  );
}
