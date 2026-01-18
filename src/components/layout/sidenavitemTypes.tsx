import { LucideIcon } from 'lucide-react';

export type SideNavItem = {
  title: string;
  kind: string;
  path: string;
  icon?: LucideIcon;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  open?:true;
  linkedaccounts?: LinkedAccountItem[];
  

};

export type MenuItemWithSubMenuProps = {
    item: SideNavItem,
    toggleOpen: () => void;
}

export type LinkedAccountItem = {
  id: string;                 // unique id, e.g. "google"
  provider: 'google' | 'facebook' | 'twitter' | 'github' | string;
 
  icon?: LucideIcon;          // brand icon
  connected: boolean;         // is this account linked
  username?: string;          // @handle or email shown
  lastSyncedAt?: string;      // ISO date string
//   path?: string;        // route to manage that account
};
