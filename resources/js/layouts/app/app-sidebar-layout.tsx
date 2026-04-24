import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';

interface AppSidebarLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    role?: 'admin' | 'client';
}

export default function AppSidebarLayout({ children, breadcrumbs = [], role = 'client' }: AppSidebarLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar role={role} />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
