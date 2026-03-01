import React from 'react';

/**
 * EnterpriseModule: Analítica (PowerBI / Excel)
 * Estándar de nomenclatura: BEM (Block Element Modifier)
 */
export default function AnaliticaPage() {
    return (
        <div className="enterprise-module enterprise-module--analitica">
            <header className="enterprise-module__header">
                <h1 className="enterprise-module__title">PowerBI & Excel Analytics</h1>
                <p className="enterprise-module__description">
                    Integración de reportes dinámicos y exportación de datos financieros.
                </p>
            </header>

            <main className="enterprise-module__content">
                <div className="enterprise-module__grid">
                    <section className="enterprise-card enterprise-card--bi">
                        <h2 className="enterprise-card__header">Dashboard de Ventas</h2>
                        <div className="enterprise-card__body enterprise-card__body--centered">
                            <div className="placeholder-bi">Visualización de PowerBI (Embed)</div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
