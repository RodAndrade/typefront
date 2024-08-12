import { IconType } from 'react-icons/lib';

export interface SidebarMenu {
  id: string;
  header?: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  id: string;
  name: string;
  icon: IconType;
  href: string;
  disabled?: boolean;
  alias?: Array<SidebarItem['href']>;
  items?: SidebarItem[];
}
