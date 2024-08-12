import Link from 'next/link';

import { cn } from '@utils/classname';

export type SidebarInternalGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function SidebarInternal({
  className,
  children,
}: SidebarInternalGenericProps) {
  return (
    <aside
      className={cn([
        'border-r border-border flex flex-col space-y-6 bg-secondary/5',
        className,
      ])}
    >
      {children}
    </aside>
  );
}

export function SidebarInternalHeader({
  className,
  children,
}: SidebarInternalGenericProps) {
  return (
    <header
      className={cn([
        'px-6 h-12 flex items-center border-b border-border',
        className,
      ])}
    >
      {children}
    </header>
  );
}

export function SidebarInternalHeaderTitle({
  className,
  children,
}: SidebarInternalGenericProps) {
  return <h2 className={cn(['', className])}>{children}</h2>;
}

export function SidebarInternalMain({
  className,
  children,
}: SidebarInternalGenericProps) {
  return <main className={cn(['px-3', className])}>{children}</main>;
}

export function SidebarInternalNav({
  className,
  children,
}: SidebarInternalGenericProps) {
  return <nav className={cn(['', className])}>{children}</nav>;
}

export function SidebarInternalNavHeader({
  className,
  children,
}: SidebarInternalGenericProps) {
  return <header className={cn(['', className])}>{children}</header>;
}

export function SidebarInternalNavHeaderTitle({
  className,
  children,
}: SidebarInternalGenericProps) {
  return (
    <div
      className={cn([
        'text-[0.6rem] uppercase text-muted-foreground ml-3',
        className,
      ])}
    >
      {children}
    </div>
  );
}

export function SidebarInternalNavMain({
  className,
  children,
}: SidebarInternalGenericProps) {
  return <main className={cn(['flex flex-col', className])}>{children}</main>;
}

type SidebarInternalNavLinkProps = {
  href: string;
  active?: boolean;
};

export function SidebarInternalNavLink({
  className,
  children,
  href,
  active,
}: SidebarInternalGenericProps<SidebarInternalNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        'flex items-center px-3 py-2 rounded-md',
        active && 'bg-primary text-primary-foreground',
        className,
      ])}
    >
      {children}
    </Link>
  );
}

export function SidebarInternalFooter({
  className,
  children,
}: SidebarInternalGenericProps) {
  return (
    <footer className={cn(['p-6 mt-auto border-t border-border', className])}>
      {children}
    </footer>
  );
}
