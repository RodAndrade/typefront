import {
  SidebarInternalNav,
  SidebarInternalNavLink,
  SidebarInternalNavMain,
} from '@components/app/SidebarInternal';
import { usePathname } from 'next/navigation';

export function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside>
      <SidebarInternalNav>
        <SidebarInternalNavMain>
          <SidebarInternalNavLink
            href="/app/settings"
            active={isActive('/app/settings')}
          >
            Perfil
          </SidebarInternalNavLink>
          <SidebarInternalNavLink
            href="/app/settings/users"
            active={isActive('/app/settings/users')}
          >
            Usuários
          </SidebarInternalNavLink>
          <SidebarInternalNavLink
            href="/app/settings/theme"
            active={isActive('/app/settings/theme')}
          >
            Aparência
          </SidebarInternalNavLink>
          {/* <SidebarInternalNavLink
            href="/app/settings/billing"
            active={isActive('/app/settings/billing')}
          >
            Assinatura
          </SidebarInternalNavLink> */}
        </SidebarInternalNavMain>
      </SidebarInternalNav>
    </aside>
  );
}
