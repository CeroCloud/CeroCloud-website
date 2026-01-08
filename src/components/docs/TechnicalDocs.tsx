import { Database, Lock, Code2, Layers, Cpu, Server } from "lucide-react";

export function TechnicalDocs() {
    return (
        <div className="space-y-12 max-w-4xl animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-extrabold mb-4">Documentación Técnica</h1>
                <p className="text-xl text-muted-foreground">
                    Detalles sobre la arquitectura, seguridad y stack tecnológico de CeroCloud.
                </p>
            </div>

            {/* Architecture */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Layers className="w-6 h-6 text-primary" /> Arquitectura
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p>
                        CeroCloud utiliza una arquitectura <strong>híbrida moderna</strong> basada en Electron.
                        Combina la flexibilidad de las tecnologías web con la potencia del acceso nativo al sistema operativo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card border p-6 rounded-xl">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-blue-500" /> Process Main (Backend Local)
                        </h3>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            <li>• Gestiona el ciclo de vida de la app</li>
                            <li>• Acceso directo a SQLite (better-sqlite3)</li>
                            <li>• I/O de archivos (Backups, Logs)</li>
                            <li>• Comunicación segura vía IPC</li>
                        </ul>
                    </div>
                    <div className="bg-card border p-6 rounded-xl">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <MonitorIcon className="w-5 h-5 text-purple-500" /> Process Renderer (Frontend)
                        </h3>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            <li>• React + Vite</li>
                            <li>• Estado global con Zustand</li>
                            <li>• Routing con React-Router</li>
                            <li>• UI con Tailwind + Shadcn</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Database */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Database className="w-6 h-6 text-primary" /> Persistencia de Datos
                </h2>
                <p className="text-muted-foreground">
                    Utilizamos <strong>SQLite</strong> como motor de base de datos embebido. Esto garantiza:
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <span className="block font-bold text-foreground">Zero Config</span>
                        <span className="text-xs text-muted-foreground">Sin instalación de servidores</span>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <span className="block font-bold text-foreground">ACID</span>
                        <span className="text-xs text-muted-foreground">Integridad transaccional</span>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <span className="block font-bold text-foreground">Portabilidad</span>
                        <span className="text-xs text-muted-foreground">Todo en un solo archivo .db</span>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="font-bold mb-2">Esquema Simplificado:</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono">
                        {`
// Products
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT UNIQUE,
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  cost DECIMAL(10,2),
  stock INTEGER DEFAULT 0
);

// Sales
CREATE TABLE sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2),
  payment_method TEXT
);
`}
                    </pre>
                </div>
            </section>

            {/* Security */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Lock className="w-6 h-6 text-primary" /> Seguridad
                </h2>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 bg-green-500/10 p-2 rounded-lg text-green-500">
                            <Server className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold">Local-First por Diseño</h3>
                            <p className="text-sm text-muted-foreground">
                                No hay nube. Los datos nunca salen de la máquina del usuario a menos que él explícitamente los exporte (ej: Backup a Google Drive).
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 bg-green-500/10 p-2 rounded-lg text-green-500">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold">Aislamiento de Contexto</h3>
                            <p className="text-sm text-muted-foreground">
                                <code>contextBridge</code> y <code>nodeIntegration: false</code> están activados. El frontend no tiene acceso directo a Node.js, preveniendo ataques RCE vía XSS.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function MonitorIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    )
}
