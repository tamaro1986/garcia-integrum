import { createClient } from '@/lib/supabase/server';
import { Button, Card } from '@/components/ui';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default async function AdminProductsPage() {
    const supabase = await createClient();

    // Fetch all products
    const { data: products } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(name),
      images:product_images(url)
    `)
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Productos</h1>
                    <p className="text-lg text-foreground/70">
                        Gestiona tu catálogo de productos
                    </p>
                </div>
                <Link href="/admin/productos/nuevo">
                    <Button size="lg" className="gap-2">
                        <Plus className="w-5 h-5" />
                        Nuevo Producto
                    </Button>
                </Link>
            </div>

            {/* Search and Filters */}
            <Card className="p-6">
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="input-field pl-10 w-full"
                        />
                    </div>
                    <select className="input-field w-48">
                        <option>Todas las categorías</option>
                        <option>Activos</option>
                        <option>Inactivos</option>
                    </select>
                    <select className="input-field w-48">
                        <option>Ordenar por fecha</option>
                        <option>Ordenar por nombre</option>
                        <option>Ordenar por precio</option>
                    </select>
                </div>
            </Card>

            {/* Products Table */}
            <Card className="p-6">
                {products && products.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Imagen</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Producto</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Categoría</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Precio</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Stock</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Estado</th>
                                    <th className="text-right py-3 px-4 font-semibold text-sm">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-border last:border-0 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                                {product.images?.[0]?.url ? (
                                                    <Image
                                                        src={product.images[0].url}
                                                        alt={product.name}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xl">
                                                        📦
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-sm text-foreground/60">{product.sku || 'Sin SKU'}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm">
                                                {product.category?.name || 'Sin categoría'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-medium">
                                            ${parseFloat(product.price).toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`${product.quantity <= 10 ? 'text-danger-600' : 'text-success-600'} font-medium`}>
                                                {product.quantity}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.is_active
                                                    ? 'bg-success-100 text-success-700 dark:bg-success-950 dark:text-success-400'
                                                    : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                                                }`}>
                                                {product.is_active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/productos/${product.id}/editar`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="sm" className="text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-950/30">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-foreground/60 mb-4">
                            No tienes productos todavía
                        </p>
                        <Link href="/admin/productos/nuevo">
                            <Button>
                                <Plus className="w-5 h-5 mr-2" />
                                Crear tu primer producto
                            </Button>
                        </Link>
                    </div>
                )}
            </Card>
        </div>
    );
}
