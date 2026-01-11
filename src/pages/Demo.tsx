import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Settings,
    LogOut,
    Search,
    Plus,
    Minus,
    CreditCard,
    Banknote,
    CheckCircle2,
    X,
    FileText,
    User,
    Bell,
    Moon,
    Command,
    Printer,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categories, products } from '@/data/demo';

export default function Demo() {
    const { t } = useTranslation('common');
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery] = useState('');
    const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Derived state
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.sku.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const cartItems = useMemo(() => {
        return cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return { ...product!, quantity: item.quantity };
        });
    }, [cart]);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    // Actions
    const addToCart = (productId: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing) {
                return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { id: productId, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === productId) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            });
        });
    };

    const handleCheckout = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowSuccessModal(true);
        }, 1500);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setCart([]);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80";
    };

    return (
        <div className="fixed inset-0 bg-[#0f172a] text-slate-200 flex overflow-hidden font-sans select-none dark">
            {/* MINIMIZED SIDEBAR */}
            <aside className="w-20 bg-[#1e293b] border-r border-slate-700/50 flex flex-col items-center py-6 z-20 hidden lg:flex">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                    <Package className="text-white w-6 h-6" />
                </div>

                <nav className="flex-1 space-y-6 w-full flex flex-col items-center">
                    <NavIcon icon={LayoutDashboard} label="Dashboard" disabled tooltip={t('demo.feature_locked')} />
                    <NavIcon icon={Package} label="Inventario" disabled tooltip={t('demo.feature_locked')} />
                    <NavIcon icon={ShoppingCart} label="Ventas" active />
                    <NavIcon icon={FileText} label="Reportes" disabled tooltip={t('demo.feature_locked')} />
                </nav>

                <div className="mt-auto space-y-6 flex flex-col items-center pb-4">
                    <NavIcon icon={Settings} label="Config" disabled tooltip={t('demo.feature_locked')} />
                    <Link to="/">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer" title="Salir">
                            <LogOut className="w-5 h-5" />
                        </div>
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT Area */}
            <main className="flex-1 flex flex-col relative min-w-0 bg-[#0f172a]">
                {/* Top Bar */}
                <header className="h-16 border-b border-slate-700/50 bg-[#1e293b]/50 flex items-center justify-between px-6 gap-4">
                    <div className="flex-1 max-w-2xl relative opacity-50 pointer-events-none" title={t('demo.feature_locked')}>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-600 bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-400">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </div>
                        <input
                            type="text"
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-12 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-not-allowed"
                            placeholder={t('demo.search_placeholder')}
                            value={searchQuery}
                            readOnly
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-400 opacity-50 cursor-not-allowed" title={t('demo.feature_locked')}><Moon className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 opacity-50 cursor-not-allowed" title={t('demo.feature_locked')}><Bell className="w-5 h-5" /></Button>
                        <div className="h-8 w-[1px] bg-slate-700" />
                        <div className="flex items-center gap-3 opacity-50 cursor-not-allowed" title={t('demo.feature_locked')}>
                            <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center overflow-hidden border border-slate-600">
                                <User className="w-5 h-5 text-slate-300" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 flex-1 flex flex-col overflow-hidden">
                    {/* Categories Pills */}
                    <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700/50 mb-6">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${activeCategory === cat.id
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                                        }`}
                                >
                                    {t(`demo.categories.${cat.id}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <ScrollArea className="flex-1 -mr-4 pr-4">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
                            <AnimatePresence mode='popLayout'>
                                {filteredProducts.map(product => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={product.id}
                                        onClick={() => addToCart(product.id)}
                                        className="cursor-pointer group relative bg-[#1e293b] border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10 transition-all ml-1"
                                    >
                                        <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                                onError={handleImageError}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-60" />

                                            <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur text-[10px] px-2 py-0.5 rounded text-slate-300 font-mono border border-slate-700/50">
                                                {product.sku}
                                            </div>
                                            {/* Stock badge */}
                                            <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-[10px] px-1.5 py-0.5 rounded text-slate-300 border border-slate-700/50 flex items-center gap-1">
                                                <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                {product.stock}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-slate-200 text-sm line-clamp-2 h-10 mb-2 leading-relaxed">{product.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-blue-400 font-bold text-lg">${product.price.toFixed(2)}</span>
                                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                    <Plus className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </ScrollArea>
                </div>
            </main>

            {/* RIGHT SIDEBAR (Ticket) */}
            <aside className="w-[400px] bg-[#1e293b] border-l border-slate-700/50 flex flex-col z-10 hidden xl:flex">
                <div className="h-12 flex items-center border-b border-slate-700/50">
                    <div className="px-6 py-3 border-r border-slate-700/50 bg-[#0f172a] text-sm font-medium text-white border-t-2 border-t-blue-500 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        Ticket 1
                    </div>
                    <button className="px-4 text-slate-500 opacity-50 cursor-not-allowed" title={t('demo.feature_locked')}>
                        <Plus className="w-4 h-4" />
                    </button>
                    <div className="ml-auto px-4">
                        <button className="text-xs text-red-400 hover:text-red-300 transition-colors" onClick={() => setCart([])}>Limpiar</button>
                    </div>
                </div>

                {/* Ticket Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#172033]">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 opacity-50">
                            <ShoppingCart className="w-16 h-16" strokeWidth={1} />
                            <p>{t('demo.cart.empty')}</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={item.id}
                                className="bg-[#1e293b] p-2 rounded-lg border border-slate-700/50 flex gap-3 group relative overflow-hidden"
                            >
                                <div className="w-12 h-12 bg-slate-800 rounded flex-shrink-0 overflow-hidden border border-slate-700">
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover"
                                        alt=""
                                        onError={handleImageError}
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                    <div className="flex justify-between items-start gap-2">
                                        <h4 className="font-medium text-sm text-slate-300 truncate">{item.name}</h4>
                                        <button onClick={() => removeFromCart(item.id)} className="text-slate-600 hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-blue-400 font-mono text-sm font-semibold">${item.price.toFixed(2)}</div>
                                        <div className="flex items-center gap-2 bg-[#0f172a] rounded px-1.5 py-0.5 border border-slate-700">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                                            <span className="text-xs font-mono w-4 text-center text-white">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-white transition-colors"><Plus className="w-3 h-3" /></button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-[#1e293b] border-t border-slate-700/50 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
                    {/* Customer */}
                    <div className="bg-[#0f172a] border border-slate-700 rounded p-3 flex items-center justify-between text-sm text-slate-300 opacity-50 cursor-not-allowed" title={t('demo.feature_locked')}>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-500" />
                            <span>Cliente (Público General)</span>
                        </div>
                        <div className="flex gap-2 text-xs text-slate-500">
                            <span className="bg-slate-800 px-1 rounded">%</span>
                            <span className="bg-slate-800 px-1 rounded">0%</span>
                        </div>
                    </div>

                    {/* Payment Types */}
                    <div className="grid grid-cols-3 gap-2">
                        <PaymentButton icon={Banknote} label={t('demo.checkout.cash')} active />
                        <PaymentButton icon={CreditCard} label={t('demo.checkout.card')} />
                        <PaymentButton icon={Command} label="Transf." />
                    </div>

                    {/* Totals */}
                    <div className="space-y-1 pt-2 border-t border-slate-800">
                        <div className="flex justify-between text-slate-400 text-sm">
                            <span>{t('demo.cart.subtotal')}</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 text-sm">
                            <span>{t('demo.cart.tax')}</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-2">
                            <span className="font-bold text-white text-lg">{t('demo.cart.total')}</span>
                            <span className="font-bold text-white text-3xl tracking-tight">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Charge Button */}
                    <Button
                        size="lg"
                        className="w-full h-14 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
                        disabled={cartItems.length === 0 || isProcessing}
                        onClick={handleCheckout}
                    >
                        {isProcessing ? (
                            <div className="flex items-center gap-2 animate-pulse">Procesando...</div>
                        ) : (
                            <div className="flex items-center justify-between w-full">
                                <span>{t('demo.cart.charge').toUpperCase()}</span>
                                <span className="text-sm font-normal opacity-80 bg-white/10 px-2 py-0.5 rounded text-[10px] tracking-wider">CTRL + ENTER</span>
                            </div>
                        )}
                    </Button>
                </div>
            </aside>

            {/* SUCCESS MODAL */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-white">{t('demo.success.title')}</h2>
                                <p className="text-slate-400 text-sm">{t('demo.success.message')}</p>
                            </div>

                            <div className="bg-[#0f172a] rounded-xl p-4 border border-slate-700/50">
                                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium mb-1">{t('demo.cart.total')}</div>
                                <div className="text-3xl font-mono font-bold text-white">${total.toFixed(2)}</div>
                            </div>

                            <div className="grid gap-3">
                                <Button className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-lg" onClick={handleCloseModal}>
                                    {t('demo.success.new_sale')}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button variant="outline" className="w-full border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800">
                                    <Printer className="w-4 h-4 mr-2" />
                                    {t('demo.success.print')}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MOBILE WARNING */}
            <div className="absolute inset-0 z-50 bg-[#0f172a] flex flex-col items-center justify-center p-8 text-center lg:hidden">
                <LayoutDashboard className="w-16 h-16 text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-white">{t('demo.desktop_warning.title')}</h2>
                <p className="text-slate-400 mb-6">{t('demo.desktop_warning.desc')}</p>
                <Link to="/">
                    <Button variant="secondary">{t('demo.desktop_warning.back')}</Button>
                </Link>
            </div>
        </div>
    );
}

function NavIcon({ icon: Icon, label, active, badge, disabled, tooltip }: any) {
    return (
        <div
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative
                ${disabled
                    ? 'opacity-40 cursor-not-allowed text-slate-600'
                    : active
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 cursor-pointer'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer'
                }
            `}
            title={tooltip || label}
        >
            <Icon className="w-5 h-5" />
            {badge && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#1e293b]" />
            )}
        </div>
    )
}

function PaymentButton({ icon: Icon, label, active }: any) {
    return (
        <button className={`flex flex-col items-center justify-center gap-1 p-2 rounded border transition-all ${active ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300 active:bg-slate-800'}`}>
            <Icon className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] uppercase font-bold tracking-wide">{label}</span>
        </button>
    )
}
