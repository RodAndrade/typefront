'use client';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@hooks/app';

import {
  Sidebar as UISidebar,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavMain,
  SidebarNavLink,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarFooter,
} from './components';
import {
  MdOutlineSettings,
  MdOutlineViewSidebar,
  MdSupportAgent,
} from 'react-icons/md';

import menu from '@config/menu';
import Link from 'next/link';
import { Button } from '@components/ui/button';

function Sidebar() {
  const pathname = usePathname();

  const { sidebarOpen, setSidebarOpen } = useApp();

  const isActive = (path: string, alias?: string[]) => {
    if (pathname && alias && alias.includes(pathname) === true) {
      return true;
    }

    return pathname === path;
  };

  return (
    <UISidebar open={sidebarOpen}>
      <SidebarHeader className="flex justify-between md:justify-center text-center">
        <Link href={'/'} className="text-2xl text-white w-full uppercase">
          Boilerplate
        </Link>

        <Button
          variant="ghost"
          className="p-1 md:hidden"
          onClick={() => setSidebarOpen((state) => !state)}
        >
          <MdOutlineViewSidebar size={24} className="text-white" />
        </Button>
      </SidebarHeader>
      <SidebarMain className="">
        {menu.map((menuItem) => (
          <SidebarNav key={`sidebar-${menuItem.id}`}>
            {!!menuItem.header && (
              <SidebarNavHeader>
                <SidebarNavHeaderTitle>{menuItem.header}</SidebarNavHeaderTitle>
              </SidebarNavHeader>
            )}

            <SidebarNavMain>
              {menuItem.items.map((item) => (
                <SidebarNavLink
                  key={`sidebar-${item.id}`}
                  href={item.href}
                  active={isActive(item.href, item?.alias)}
                  disabled={item?.disabled}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </SidebarNavLink>
              ))}
            </SidebarNavMain>
          </SidebarNav>
        ))}

        <div className="mt-auto">
          <SidebarNav className="mb-2">
            <SidebarNavMain className="gap-0">
              <SidebarNavLink
                href={process?.env?.NEXT_PUBLIC_SUPPORT_URL ?? './'}
                target="_blank"
              >
                <MdSupportAgent size={20} className="mr-3" />
                {'Suporte'}
              </SidebarNavLink>
              <SidebarNavLink
                href={'/app/settings'}
                active={isActive('/app/settings', [
                  '/app/settings',
                  '/app/settings/users',
                  '/app/settings/theme',
                ])}
              >
                <MdOutlineSettings size={20} className="mr-3" />
                {'Configurações'}
              </SidebarNavLink>
            </SidebarNavMain>
          </SidebarNav>
          <SidebarFooter className="text-center text-[0.6rem] uppercase text-white px-2 pt-4 pb-2">
            Desenvolvido por{' '}
            <a
              target="_blank"
              href="https://github.com/rodandrade"
              className="text-[0.6rem] underline"
            >
              @rodandrade
            </a>
          </SidebarFooter>
        </div>
      </SidebarMain>
    </UISidebar>
  );
}

export default memo(Sidebar);
