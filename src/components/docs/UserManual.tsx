import { ShoppingCart, Package, BarChart3, AlertCircle, Plus, Printer } from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import welcomeLight from "@/assets/docs/welcome-light.png";
import welcomeDark from "@/assets/docs/welcome-dark.png";
import posLight from "@/assets/docs/pos-light.png";
import posDark from "@/assets/docs/pos-dark.png";

export function UserManual() {
    const { theme } = useTheme();

    return (
        <div className="space-y-16 max-w-4xl animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-extrabold mb-6">Manual de Usuario</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Aprende a dominar CeroCloud. Desde tu primera venta hasta la gestión avanzada de inventario.
                </p>
                <div className="flex gap-4 flex-wrap">
                    <a href="#primer-inicio" className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">Primer Inicio</a>
                    <a href="#inventario" className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">Inventario</a>
                    <a href="#pos" className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">Punto de Venta</a>
                    <a href="#reportes" className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">Reportes</a>
                </div>
            </div>

            {/* Primer Inicio */}
            <section id="primer-inicio" className="space-y-6 scroll-mt-24">
                <h2 className="text-3xl font-bold border-b pb-4">1. Primer Inicio</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            Al abrir CeroCloud por primera vez, te guiaremos por un asistente de configuración rápida. Aquí definirás la identidad de tu negocio.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                <div>
                                    <strong className="block text-foreground">Datos del Negocio</strong>
                                    <span className="text-sm text-muted-foreground">Nombre, dirección y contacto. Estos aparecerán en tus tickets.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                <div>
                                    <strong className="block text-foreground">Moneda e Impuestos</strong>
                                    <span className="text-sm text-muted-foreground">Define tu moneda local (ej: USD, MXN) y el IVA predeterminado.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                <div>
                                    <strong className="block text-foreground">Logo</strong>
                                    <span className="text-sm text-muted-foreground">Sube tu logo para personalizar la aplicación.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-border shadow-md">
                        <img
                            loading="lazy"
                            src={theme === "dark" ? welcomeDark : welcomeLight}
                            alt="Pantalla de Bienvenida CeroCloud"
                            className="w-full h-auto object-cover transition-all duration-300"
                        />
                    </div>
                </div>
            </section>

            {/* Inventario */}
            <section id="inventario" className="space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                    <Package className="w-8 h-8 text-blue-500" />
                    <h2 className="text-3xl font-bold">2. Gestión de Inventario</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    El corazón de tu negocio. Mantén organizado tu catálogo de productos.
                </p>

                <div className="bg-card border rounded-xl overflow-hidden">
                    <div className="p-6 border-b bg-muted/30">
                        <h3 className="font-bold text-lg mb-2">Acciones Principales</h3>
                    </div>
                    <div className="divide-y">
                        <div className="p-6 flex gap-4">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg h-fit">
                                <Plus className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Agregar Producto</h4>
                                <p className="text-sm text-muted-foreground mb-2">Haz clic en "Nuevo Producto". Debes llenar:</p>
                                <ul className="text-sm list-disc pl-5 text-muted-foreground space-y-1">
                                    <li><strong>Nombre:</strong> Lo que verá el cliente.</li>
                                    <li><strong>Código/SKU:</strong> Escanea el código de barras aquí.</li>
                                    <li><strong>Precio Compra/Venta:</strong> Para calcular ganancias.</li>
                                    <li><strong>Stock:</strong> Cantidad actual.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="p-6 flex gap-4">
                            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg h-fit">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Control de Stock Bajo</h4>
                                <p className="text-sm text-muted-foreground">
                                    Define un "Stock Mínimo". Cuando un producto baje de esa cantidad, CeroCloud lo marcará en rojo y te enviará una alerta en el Dashboard para que reabastezcas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* POS */}
            <section id="pos" className="space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                    <ShoppingCart className="w-8 h-8 text-green-500" />
                    <h2 className="text-3xl font-bold">3. Punto de Venta (POS)</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="rounded-xl overflow-hidden border border-border shadow-md">
                        <img
                            loading="lazy"
                            src={theme === "dark" ? posDark : posLight}
                            alt="Interfaz de Punto de Venta"
                            className="w-full h-auto object-cover transition-all duration-300"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Flujo de Venta Rápida</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="font-mono bg-primary/10 text-primary px-2 rounded">01</span>
                                <p className="text-sm text-muted-foreground"><strong>Buscar:</strong> Escanea un código de barras o escribe el nombre del producto en la barra de búsqueda.</p>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-mono bg-primary/10 text-primary px-2 rounded">02</span>
                                <p className="text-sm text-muted-foreground"><strong>Agregar:</strong> El producto se suma al carrito. Puedes ajustar la cantidad con los botones [+] y [-].</p>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-mono bg-primary/10 text-primary px-2 rounded">03</span>
                                <p className="text-sm text-muted-foreground"><strong>Cobrar:</strong> Presiona "Completar Venta". Elige el método de pago (Efectivo, Tarjeta, Mixto).</p>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-mono bg-primary/10 text-primary px-2 rounded">04</span>
                                <p className="text-sm text-muted-foreground"><strong>Ticket:</strong> Si ingresaste un monto en efectivo, te dirá el cambio. Puedes imprimir el ticket o enviarlo por email.</p>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="bg-blue-500/5 p-6 rounded-xl border border-blue-500/10 flex gap-4">
                    <Printer className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-blue-500 mb-1">Tip Pro: Impresión Térmica</h4>
                        <p className="text-sm text-muted-foreground">
                            CeroCloud detecta automáticamente impresoras predeterminadas. Para tickets de 58mm o 80mm, asegúrate de configurar el tamaño de papel en Configuración {'>'} Impresoras.
                        </p>
                    </div>
                </div>
            </section>

            {/* Reports */}
            <section id="reportes" className="space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                    <h2 className="text-3xl font-bold">4. Reportes y Análisis</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                    Toma decisiones basadas en datos. CeroCloud genera reportes automáticos de tu operación.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ReportCard title="Corte de Caja" desc="Resumen diario de ventas, efectivo en caja y métodos de pago." />
                    <ReportCard title="Productos Top" desc="Descubre qué se vende más y qué productos están estancados." />
                    <ReportCard title="Historial de Ventas" desc="Lista detallada de todas las transacciones. Permite cancelaciones y reimpresiones." />
                    <ReportCard title="Valor de Inventario" desc="Calcula cuánto dinero tienes invertido en mercancía actualmente." />
                    <ReportCard title="Ganancias" desc="Diferencia entre costos y ventas (Margen de utilidad)." />
                    <ReportCard title="Exportar Todo" desc="Descarga cualquier reporte a Excel (CSV) o PDF con un clic." />
                </div>
            </section>
        </div>
    );
}

function ReportCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-4 rounded-xl bg-card border hover:border-primary/50 transition-colors">
            <h4 className="font-bold mb-2">{title}</h4>
            <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
    )
}
