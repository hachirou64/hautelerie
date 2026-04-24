import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    role?: 'admin' | 'client';
}

export default ({ children, breadcrumbs, role = 'client', ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} role={role} {...props}>
        {children}
    </AppLayoutTemplate>
);
