
import { Folder, HelpCircle, History, Instagram, LinkedinIcon, LucideIcon, Mail, Settings, Table, User2, UserIcon, Zap } from "lucide-react";
import { SideNavItem } from './sidenavitemTypes';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Table,
    kind: 'normal'
    
  },
//   {
//     title: 'Projects',
//     path: '/projects',
//     icon: Folder,
//     submenu: true,
//     subMenuItems: [
//       { title: 'All', path: '/projects' },
//       { title: 'Web Design', path: '/projects/web-design' },
//       { title: 'Graphic Design', path: '/projects/graphic-design' },
//     ],
//   },
  {
    title: 'History',
    path: '/dashboard/history',
    icon: History,
    kind: 'normal'
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account', kind:'normal' },
      { title: 'Privacy', path: '/settings/privacy', kind:'normal'},
    ],
    kind: 'normal'
    
  },
  {
    title: 'Accounts',
    path: '/dashboard/linked-accounts',
    icon: UserIcon,
    submenu: true,
    linkedaccounts: [
        {id: 'g', provider: 'instagram', icon: Instagram, connected: true, username: '@itsdavidmea' },
        {id: 'g', provider: 'linkdin', icon: LinkedinIcon, connected: true, username: '@itsdavidmea' }
      
    ],
    kind: 'linked'
  },
  {
    title: 'Help',
    path: '/dashboard/help',
    icon: HelpCircle,
    kind: 'normal'
  },
  
  
];