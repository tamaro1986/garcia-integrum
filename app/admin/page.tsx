import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui';
import { Shield, Binary, DollarSign, Users, TrendingUp, BarChart3 } from 'lucide-react';

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch stats (Keeping logic but changing labels for the new context)
    const [servicesCount, projectsCount, clientsCount] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
    ]);

    // Calculate revenue from projects
    const { data: projectPayments } = await supabase
        .from('orders')
        .select('total')
        .eq('payment_status', 'paid');

    const totalRevenue = projectPayments?.reduce((sum, order) => sum + parseFloat(order.total), 0) || 0;

    const stats = [
        {
            label: 'Catálogo Servicios',
            value: servicesCount.count || 0,
            icon: Shield,
            color: 'primary',
        },
        {
            label: 'Proyectos Activos',
            value: projectsCount.count || 0,
            icon: BarChart3,
            color: 'accent',
        },
        {
            label: 'Clientes Corp.',
            value: clientsCount.count || 0,
            icon: Users,
            color: 'success',
        },
        {
            label: 'Ingresos Totales',
            value: `$${totalRevenue.toLocaleString('es-SV', { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            color: 'primary',
        },
    ];

    return (
        <div className="space-y-8">
            <header className="animate-fade-up">
                <h1 className="text-4xl font-black text-gradient uppercase tracking-tighter mb-2">Garcia Integrum Strategy Control</h1>
                <p className="text-lg text-foreground/70 font-medium">
                    Panel estratégico de operaciones y consultoría IA
                </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="p-6 glass-card-hover border-b-4 border-b-primary-500/50">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40">{stat.label}</p>
                                    <p className="text-3xl font-black">{stat.value}</p>
                                </div>
                                <div className={`p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-${stat.color === 'primary' ? 'primary-600' : stat.color === 'accent' ? 'accent-600' : 'success-600'}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Business Activity */}
            <Card className="p-8 border-none shadow-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Actividad de Proyectos</h2>
                        <p className="text-sm text-foreground/50 font-bold">Últimas interacciones con clientes corporativos</p>
                    </div>
                    <div className="p-3 rounded-xl bg-success-100 dark:bg-success-900/30">
                        <TrendingUp className="w-6 h-6 text-success-600" />
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest opacity-40">Ref. Proyecto</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest opacity-40">Cliente</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest opacity-40">Presupuesto</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest opacity-40">Estado Hito</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest opacity-40">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((row) => (
                                <tr key={row} className="border-b border-border last:border-0 hover:bg-primary-50/50 dark:hover:bg-primary-950/10 transition-colors group">
                                    <td className="py-5 px-6 font-black text-sm">PROJ-2026-00{row}</td>
                                    <td className="py-5 px-6 font-bold text-foreground/80 text-sm">Corporación Ejemplo {row}</td>
                                    <td className="py-5 px-6 font-black text-primary-600 text-sm">$4,500.00</td>
                                    <td className="py-5 px-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-400">
                                            Completado
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-xs font-bold text-foreground/40">
                                        28 FEB 2026
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
