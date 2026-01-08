import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const technologies = [
    {
        name: "Electron.js",
        description: "Desktop Framework",
        color: "from-cyan-500 to-blue-500",
    },
    {
        name: "React.js",
        description: "UI Library",
        color: "from-blue-500 to-cyan-400",
    },
    {
        name: "SQLite",
        description: "Database Engine",
        color: "from-blue-600 to-blue-400",
    },
    {
        name: "TypeScript",
        description: "Type Safety",
        color: "from-blue-500 to-blue-600",
    },
    {
        name: "Tailwind CSS",
        description: "Styling",
        color: "from-cyan-500 to-teal-500",
    },
    {
        name: "Node.js",
        description: "Runtime",
        color: "from-green-600 to-green-500",
    },
];

export default function TechStack() {
    return (
        <section id="tech-stack" className="py-20 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                        <Code2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Stack Tecnológico</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Construido con Tecnologías Modernas
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Arquitectura de tres capas para garantizar seguridad, rendimiento y mantenibilidad
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="group"
                        >
                            <div className="relative bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />

                                <div className="relative">
                                    <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center`}>
                                        <Code2 className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">{tech.name}</h3>
                                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Architecture Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Núcleo (Main Process)",
                                description: "Electron.js y Node.js para gestión del sistema",
                            },
                            {
                                title: "Base de Datos",
                                description: "SQLite con modo WAL para alto rendimiento",
                            },
                            {
                                title: "Interfaz (Renderer)",
                                description: "React.js con Vite y Tailwind CSS",
                            },
                        ].map((layer, index) => (
                            <motion.div
                                key={layer.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                                className="bg-card border border-border rounded-xl p-6 text-center"
                            >
                                <h4 className="font-bold mb-2">{layer.title}</h4>
                                <p className="text-sm text-muted-foreground">{layer.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
