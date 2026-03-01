'use client';

import { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        try {
            // Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (authError) throw authError;

            if (authData.user) {
                // Create profile
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        email: email,
                        full_name: fullName,
                        role: 'customer',
                    });

                if (profileError) throw profileError;

                router.push('/');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message || 'Error al registrarse');
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
                    <h2 className="text-3xl font-bold">Crear Cuenta</h2>
                    <p className="mt-2 text-foreground/60">
                        Regístrate para empezar a comprar
                    </p>
                </div>

                {/* Register Form */}
                <Card glass className="p-8">
                    <form onSubmit={handleRegister} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-danger-50 dark:bg-danger-950/30 border border-danger-200 dark:border-danger-800 rounded-lg text-danger-700 dark:text-danger-400 text-sm animate-fade-in">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Nombre Completo"
                            type="text"
                            placeholder="Juan Pérez"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />

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

                        <Input
                            label="Confirmar Contraseña"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <div className="text-xs text-foreground/60">
                            Al registrarte, aceptas nuestros{' '}
                            <Link href="/terminos" className="text-primary-600 hover:text-primary-700">
                                Términos y Condiciones
                            </Link>{' '}
                            y{' '}
                            <Link href="/privacidad" className="text-primary-600 hover:text-primary-700">
                                Política de Privacidad
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={isLoading}
                        >
                            Crear Cuenta
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-foreground/60">¿Ya tienes cuenta? </span>
                        <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                            Inicia sesión
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
