import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Scale, Check, X, Info } from "lucide-react";

export default function License() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <Helmet>
                <title>Licencia Legal - Utiliza CeroCloud Libremente</title>
                <meta name="description" content="Información legal sobre el uso de CeroCloud. Código abierto bajo licencia MIT + Commons Clause." />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-full mb-6 text-yellow-500">
                        <Scale className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Licencia y Uso Legal</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        CeroCloud es software de <strong className="text-foreground">Código Abierto</strong> bajo la licencia <span className="text-foreground font-semibold">MIT + Commons Clause</span>.
                        <br />Diseñado para ser libre, pero protegido contra explotación comercial.
                    </p>
                </motion.div>

                {/* License Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* Allowed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-3">
                            <Check className="w-6 h-6 border-2 border-green-500 rounded-full p-0.5" />
                            Lo que SÍ puedes hacer
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Usar CeroCloud en tu negocio gratuitamente (sin límites)",
                                "Instalarlo en múltiples computadoras",
                                "Modificar el código fuente para tu uso personal",
                                "Estudiar cómo funciona el sistema",
                                "Compartir modificaciones de forma gratuita"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Restricted */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-3">
                            <X className="w-6 h-6 border-2 border-red-500 rounded-full p-0.5" />
                            Lo que NO puedes hacer
                        </h3>
                        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-red-500/80">Commons Clause Restriction</div>
                        <ul className="space-y-4">
                            {[
                                "Vender el software (ejecutable o código) a terceros",
                                "Cobrar por servicios de instalación o configuración",
                                "Ofrecer CeroCloud como un servicio SaaS pagado",
                                "Incluirlo en paquetes de software comercial",
                                "Eliminar los avisos de copyright y licencia"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-8 mb-20 bg-muted/20 p-8 rounded-2xl border border-border">
                    <h2 className="text-2xl font-bold ">Preguntas Frecuentes</h2>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-lg mb-2">¿Es realmente gratis para mi empresa?</h4>
                            <p className="text-muted-foreground">
                                Absolutamente. Ya seas un pequeño emprendedor o una empresa con 500 empleados,
                                puedes usar CeroCloud internamente sin pagar ni un centavo, para siempre.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">¿Puedo contratar a alguien para que le agregue funciones?</h4>
                            <p className="text-muted-foreground">
                                Sí. Puedes pagar a un desarrollador para que modifique TU versión de CeroCloud para uso interno.
                                Lo que no puede hacer ese desarrollador es vender esa versión modificada a otras personas.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">¿Por qué usar esta licencia y no MIT puro?</h4>
                            <p className="text-muted-foreground">
                                Queremos garantizar que CeroCloud siga siendo gratuito para los usuarios finales y evitar
                                que empresas de terceros se apropien del trabajo de la comunidad para venderlo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="flex bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl gap-4 items-start">
                    <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-blue-500 mb-1">Sin Garantías (AS IS)</h4>
                        <p className="text-sm text-muted-foreground">
                            El software se proporciona "tal cual", sin garantía de ningún tipo. Los autores no se hacen responsables
                            de daños o pérdida de datos. Te recomendamos encarecidamente realizar copias de seguridad frecuentes
                            de tu información utilizando nuestra herramienta de backups.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
