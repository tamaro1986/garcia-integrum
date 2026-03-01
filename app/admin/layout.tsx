import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Shield, BarChart3, Binary } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('dummy');

    let user = null;
    let profile = null;

    if (!isDummy) {
        const supabase = await createClient();
        const { data } = await supabase.auth.getUser();
        user = data.user;

        if (!user) {
            redirect('/login');
        }

        // Check if user is admin
        const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
        profile = profileData;

        if (profile?.role !== 'admin') {
            redirect('/');
        }
    } else {
        // Mock user for local dev
        user = { id: 'dummy', email: 'admin@dummy.com' };
        profile = { role: 'admin' };
    }

    const navItems = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/auditoria', icon: Shield, label: 'Auditoría' },
        { href: '/admin/analitica', icon: BarChart3, label: 'Analítica' },
        { href: '/admin/ia-desarrollo', icon: Binary, label: 'IA Desarrollo' },
        { href: '/admin/productos', icon: Package, label: 'Servicios' },
    ];

    return (
        <div className="min-h-screen gradient-bg">
            {/* Admin Header */}
            <header className="glass-card sticky top-0 z-50 shadow-sm border-b border-gray-100">
                <div className="container-custom py-2 md:py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link href="/admin" className="flex items-center gap-2 group">
                                <div className="relative w-8 h-8 flex-shrink-0">
                                    <Image
                                        src="/logo-garcia-icon.png"
                                        alt="Garcia Integrum Icon"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-lg font-black tracking-tighter uppercase" style={{ color: '#0A2540' }}>
                                        Garcia
                                    </span>
                                    <span className="text-[8px] font-bold uppercase tracking-[0.2em]" style={{ color: '#059669' }}>
                                        Integrum Admin
                                    </span>
                                </div>
                            </Link>
                            <nav className="hidden md:flex gap-6">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center gap-2 text-sm font-medium hover:text-primary-600 transition-colors"
                                        >
                                            <Icon className="w-4 h-4" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-xs md:text-sm hover:text-primary-600 transition-colors">
                                Ver Tienda
                            </Link>
                            <form action="/api/auth/signout" method="post">
                                <button className="text-xs md:text-sm font-medium text-danger-600 hover:text-danger-700">
                                    Cerrar Sesión
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Mobile Navigation bar */}
                    <nav className="flex md:hidden gap-5 overflow-x-auto pt-3 mt-2 border-t border-gray-100 pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-1.5 text-xs font-medium hover:text-primary-600 transition-colors whitespace-nowrap"
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container-custom py-8">
                {children}
            </main>
        </div>
    );
}
