"use client";

import { useCart } from "../context/CartContext";
import Button from "../components/Button";

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <h2 className="text-xl font-bold">Keranjang ({totalItems})</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="text-center py-12">
                                <svg
                                    className="w-16 h-16 mx-auto text-slate-300 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <p className="text-slate-500">Keranjang kosong</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-medium text-slate-800">{item.name}</h3>
                                            <p className="text-emerald-600 font-semibold">
                                                Rp {item.price.toLocaleString("id-ID")}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-600">Total</span>
                                <span className="text-2xl font-bold text-emerald-700">
                                    Rp {totalPrice.toLocaleString("id-ID")}
                                </span>
                            </div>
                            <Button className="w-full" size="lg" onClick={onCheckout}>
                                Checkout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
