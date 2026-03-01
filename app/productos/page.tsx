import { createClient } from '@/lib/supabase/server';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProductsPage() {
    const supabase = await createClient();

    // Fetch products from database
    const { data: products } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(name, slug),
      images:product_images(url, alt_text)
    `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(12);

    return (
        <div className="min-h-screen gradient-bg">
            {/* Header */}
            <div className="glass-card">
                <div className="container-custom py-8">
                    <h1 className="text-4xl font-bold mb-4">Todos los Productos</h1>
                    <p className="text-lg text-foreground/70">
                        Explora nuestro catálogo completo
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-64 space-y-6">
                        <Card className="p-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5" />
                                Filtros
                            </h3>

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    className="input-field pl-10"
                                />
                            </div>

                            {/* Price Range */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Rango de Precio</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="input-field text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="input-field text-sm"
                                    />
                                </div>
                            </div>

                            {/* Categories will be populated dynamically */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Categorías</label>
                                <div className="space-y-2">
                                    {['Electrónica', 'Ropa', 'Hogar', 'Deportes'].map((cat) => (
                                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded border-input" />
                                            <span className="text-sm">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button variant="primary" className="w-full" size="sm">
                                Aplicar Filtros
                            </Button>
                        </Card>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Sort Bar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-foreground/60">
                                {products?.length || 0} productos encontrados
                            </p>
                            <select className="input-field w-auto text-sm">
                                <option>Más Recientes</option>
                                <option>Precio: Menor a Mayor</option>
                                <option>Precio: Mayor a Menor</option>
                                <option>Más Populares</option>
                            </select>
                        </div>

                        {/* Products Grid */}
                        {products && products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/productos/${product.slug}`}
                                        className="product-card group"
                                    >
                                        <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 dark:from-zinc-800 dark:to-zinc-700 rounded-t-2xl overflow-hidden">
                                            {product.images?.[0]?.url ? (
                                                <Image
                                                    src={product.images[0].url}
                                                    alt={product.images[0].alt_text || product.name}
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-4xl">📦</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 space-y-3">
                                            {product.category && (
                                                <span className="text-xs font-semibold text-primary-600 uppercase">
                                                    {product.category.name}
                                                </span>
                                            )}
                                            <h3 className="font-semibold text-lg line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-foreground/60 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    {product.compare_at_price && (
                                                        <span className="text-sm text-foreground/40 line-through mr-2">
                                                            ${product.compare_at_price}
                                                        </span>
                                                    )}
                                                    <span className="text-2xl font-bold text-primary-600">
                                                        ${product.price}
                                                    </span>
                                                </div>
                                                <Button size="sm">
                                                    Agregar
                                                </Button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <p className="text-lg text-foreground/60">
                                    No hay productos disponibles en este momento
                                </p>
                                <Link href="/">
                                    <Button variant="primary" className="mt-4">
                                        Volver al Inicio
                                    </Button>
                                </Link>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
