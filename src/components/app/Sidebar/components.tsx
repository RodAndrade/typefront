import Link from 'next/link';

import { cn } from '@utils/classname';

export type SidebarGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function Sidebar({
  open,
  className,
  children,
}: SidebarGenericProps<{
  open: boolean;
}>) {
  return (
    <aside
      className={cn([
        'sidebar bg-primary dark:bg-[#152763] flex w-[300px] flex-col transition-all duration-300',
        className,
      ])}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ className, children }: SidebarGenericProps) {
  return (
    <header className={cn(['p-4 h-20 flex items-center gap-4', className])}>
      {children}
    </header>
  );
}

export function SidebarHeaderTitle({
  className,
  children,
}: SidebarGenericProps) {
  return <h2 className={cn(['', className])}>{children}</h2>;
}

export function SidebarMain({ className, children }: SidebarGenericProps) {
  return (
    <div className={cn(['p-3 flex flex-col flex-grow gap-y-4', className])}>
      {children}
    </div>
  );
}

export function SidebarNav({ className, children }: SidebarGenericProps) {
  return <nav className={cn(['', className])}>{children}</nav>;
}

export function SidebarNavHeader({ className, children }: SidebarGenericProps) {
  return <header className={cn(['mb-1', className])}>{children}</header>;
}

export function SidebarNavHeaderTitle({
  className,
  children,
}: SidebarGenericProps) {
  return (
    <div className={cn(['text-[0.6rem] uppercase text-white ml-3', className])}>
      {children}
    </div>
  );
}

export function SidebarNavMain({ className, children }: SidebarGenericProps) {
  return (
    <div className={cn(['flex flex-col gap-y-1', className])}>{children}</div>
  );
}

type SidebarNavLinkProps = {
  href: string;
  active?: boolean;
  disabled?: boolean;
};

export function SidebarNavLink({
  className,
  children,
  href,
  active,
  target,
  disabled = false,
}: SidebarGenericProps<SidebarNavLinkProps> & {
  target?: string;
}) {
  return (
    <Link
      href={href}
      className={cn([
        'flex items-center px-3 py-3 text-xl text-white rounded-md hover:pl-5 transition-all duration-300',
        active && '!bg-[#223a87] border-l-4 border-[#55FFD6]',
        disabled && 'pointer-events-none opacity-20 cursor-not-allowed',
        className,
      ])}
      passHref={!!target}
      target={target}
      rel={target ? 'noreferrer noopener' : undefined}
    >
      {children}
    </Link>
  );
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer className={cn(['p-6 border-t border-border', className])}>
      {children}
    </footer>
  );
}
