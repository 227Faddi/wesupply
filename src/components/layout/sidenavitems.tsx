
import { Folder, HelpCircle, History, House, Instagram, LinkedinIcon, LucideIcon, Mail, Settings, Table, User2, UserIcon, Zap } from "lucide-react";
import { SideNavItem } from './sidenavitemTypes';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/home',
    icon: House,
    kind: 'normal'
    
  },


  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
    kind: 'normal'
    
  },
 
  {
    title: 'Help',
    path: '/dashboard/help',
    icon: HelpCircle,
    kind: 'normal'
  },
  
  
];