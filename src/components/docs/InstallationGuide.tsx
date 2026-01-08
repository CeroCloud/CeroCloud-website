import { Terminal, Download, Monitor, Laptop, AlertTriangle, CheckCircle2 } from "lucide-react";

export function InstallationGuide() {
    return (
        <div className="space-y-12 max-w-4xl animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-extrabold mb-4">Guía de Instalación</h1>
                <p className="text-xl text-muted-foreground">
                    Instala CeroCloud en tu computadora en pocos minutos. Compatible con Windows, macOS y Linux.
                </p>
            </div>

            {/* System Requirements */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Requisitos del Sistema</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-card border rounded-xl">
                        <Monitor className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold mb-2">Windows</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li>Windows 10 o 11 (64-bit)</li>
                            <li>4GB RAM mínimo</li>
                            <li>500MB espacio libre</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-card border rounded-xl">
                        <Laptop className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold mb-2">macOS</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li>macOS 10.15+ (Catalina)</li>
                            <li>Soporte chip Apple M1/M2/M3</li>
                            <li>4GB RAM mínimo</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-card border rounded-xl">
                        <Terminal className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold mb-2">Linux</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li>Ubuntu 20.04+, Fedora, Arch</li>
                            <li>Soporte AppImage / .deb</li>
                            <li>4GB RAM mínimo</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Windows Installation */}
            <section className="space-y-6" id="install-windows">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Monitor className="w-6 h-6" /> Instalación en Windows
                </h2>
                <div className="space-y-6 border-l-2 border-primary/20 pl-6 ml-4 md:ml-6">
                    <div className="relative">
                        <span className="absolute -left-[33px] top-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">1</span>
                        <h3 className="text-lg font-bold mb-2">Descargar el Instalador</h3>
                        <p className="text-muted-foreground mb-4">
                            Ve a la página de <a href="/releases" className="text-primary hover:underline">Descargas</a> y baja el archivo
                            <code className="bg-muted px-2 py-1 rounded mx-1 text-sm">CeroCloud-Setup-1.2.0.exe</code>.
                        </p>
                    </div>

                    <div className="relative">
                        <span className="absolute -left-[33px] top-0 w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm border-2 border-background">2</span>
                        <h3 className="text-lg font-bold mb-2">Ejecutar el Archivo</h3>
                        <p className="text-muted-foreground mb-4">
                            Haz doble clic en el archivo descargado. Es posible que veas una advertencia de "Windows protegió su PC" (SmartScreen).
                        </p>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 text-sm">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-yellow-500 mb-1">¿Por qué aparece esto?</p>
                                <p className="text-muted-foreground">
                                    Como somos un proyecto open source gratuito, no pagamos la costosa certificación de Microsoft.
                                    Haz clic en "Más información" y luego en "Ejecutar de todas formas". Es 100% seguro.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <span className="absolute -left-[33px] top-0 w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm border-2 border-background">3</span>
                        <h3 className="text-lg font-bold mb-2">Instalación Automática</h3>
                        <p className="text-muted-foreground">
                            El instalador configurará todo automáticamente. Al terminar, CeroCloud se abrirá solo y creará un acceso directo en tu escritorio.
                        </p>
                    </div>
                </div>
            </section>

            {/* macOS Installation */}
            <section className="space-y-6" id="install-mac">
                <hr className="border-border" />
                <h2 className="text-2xl font-bold flex items-center gap-2 mt-8">
                    <Laptop className="w-6 h-6" /> Instalación en macOS
                </h2>
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        1. Descarga el archivo <code className="bg-muted px-2 py-1 rounded text-sm">CeroCloud-1.2.0.dmg</code> (Intel) o <code className="bg-muted px-2 py-1 rounded text-sm">CeroCloud-1.2.0-arm64.dmg</code> (Apple Silicon).
                    </p>
                    <p className="text-muted-foreground">
                        2. Abre el archivo DMG y arrastra el ícono de CeroCloud a la carpeta de <strong>Aplicaciones</strong>.
                    </p>
                    <p className="text-muted-foreground">
                        3. Al abrirlo por primera vez, haz clic derecho y selecciona "Abrir" si macOS bloquea la aplicación por ser de un desarrollador no identificado.
                    </p>
                </div>
            </section>

            {/* Updates */}
            <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                <div className="flex gap-4">
                    <Download className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                        <h3 className="text-xl font-bold mb-2">Actualizaciones Automáticas</h3>
                        <p className="text-muted-foreground mb-4">
                            CeroCloud buscará nuevas versiones automáticamente cada vez que lo abras. Si hay una actualización, se descargará en segundo plano y se instalará la próxima vez que reinicies la app.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-green-500 font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            Siempre estarás al día sin esfuerzo.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
