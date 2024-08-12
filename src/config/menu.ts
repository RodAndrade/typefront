import {
  MdOutlineDescription,
  MdOutlineDeviceHub,
  MdOutlineHome,
  MdOutlinePeople,
  MdStorefront,
} from 'react-icons/md';

import { SidebarMenu } from '@components/app/Sidebar/types';
import { RoutesConstants } from '@constants/routes';

const menu: SidebarMenu[] = [
  {
    id: 'shortcuts',
    items: [
      {
        id: 'shortcuts:home',
        name: 'Home',
        href: '/app',
        icon: MdOutlineHome,
      },
    ],
  },
  {
    id: 'integrations',
    header: 'Integrações',
    items: [
      {
        id: 'workspace:connections',
        name: 'Integrações',
        href: '/app/integrations',
        icon: MdOutlineDeviceHub,
        disabled: true,
      },
      {
        id: 'shortcuts:logs',
        name: 'Logs',
        href: '/app/integrations/logs',
        icon: MdOutlineDescription,
        disabled: true,
      },
    ],
  },
  {
    id: 'settings',
    header: 'Configurações',
    items: [
      {
        id: 'settings:users',
        name: 'Usuários',
        href: RoutesConstants.SETTINGS_USERS,
        icon: MdOutlinePeople,
      },
      {
        id: 'settings:companies',
        name: 'Empresas',
        href: '/app/companies',
        icon: MdStorefront,
        disabled: true,
      },
    ],
  },
];

export default menu;
