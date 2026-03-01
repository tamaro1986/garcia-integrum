'use client';

import { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 animate-fade-up">
                {/* Logo */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8">
                        <ShoppingBag className="w-10 h-10 text-primary-600" />
                        <span className="text-3xl font-bold text-gradient">Tienda SV</span>
                    </Link>
                    <h2 className="text-3xl font-bold">Inicia Sesión</h2>
                    <p className="mt-2 text-foreground/60">
                        Accede a tu cuenta para continuar comprando
                    </p>
                </div>

                {/* Login Form */}
                <Card glass className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-danger-50 dark:bg-danger-950/30 border border-danger-200 dark:border-danger-800 rounded-lg text-danger-700 dark:text-danger-400 text-sm animate-fade-in">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Correo Electrónico"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-input" />
                                <span className="text-foreground/60">Recordarme</span>
                            </label>
                            <Link href="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={isLoading}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-foreground/60">¿No tienes cuenta? </span>
                        <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                            Regístrate aquí
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
