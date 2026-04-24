import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, BedDouble, CalendarDays, CreditCard, User, HeadphonesIcon, Settings, Shield, Users, Star } from 'lucide-react';
import AppLogo from './app-logo';

// Menu pour les clients
const clientNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Mes Réservations',
        url: '/dashboard/reservations',
        icon: CalendarDays,
    },
    {
        title: 'Chambres',
        url: '/dashboard/chambres',
        icon: BedDouble,
    },
    {
        title: 'Historique Paiements',
        url: '/dashboard/paiements',
        icon: CreditCard,
    },
    {
        title: 'Mon Profil',
        url: '/dashboard/profil',
        icon: User,
    },
    {
        title: 'Support',
        url: '/dashboard/support',
        icon: HeadphonesIcon,
    },
];

// Menu pour les administrateurs
const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard Admin',
        url: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Réservations',
        url: '/admin/reservations',
        icon: CalendarDays,
    },
    {
        title: 'Chambres',
        url: '/admin/chambres',
        icon: BedDouble,
    },
    {
        title: 'Paiements',
        url: '/admin/paiements',
        icon: CreditCard,
    },
    {
        title: 'Utilisateurs',
        url: '/admin/utilisateurs',
        icon: Users,
    },
    {
        title: 'Services',
        url: '/admin/services',
        icon: Star,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

interface AppSidebarProps {
    role?: 'admin' | 'client';
}

export function AppSidebar({ role = 'client' }: AppSidebarProps) {
    const mainNavItems = role === 'admin' ? adminNavItems : clientNavItems;
    const dashboardUrl = role === 'admin' ? '/admin/dashboard' : '/dashboard';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
