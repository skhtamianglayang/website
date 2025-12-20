import { Product } from "../context/DataContext";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-slate-100">
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 text-xs font-medium bg-emerald-600 text-white rounded-full shadow">
                        {product.category}
                    </span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-2">
                    {product.description}
                </p>
                <p className="text-emerald-600 font-bold text-xl mb-4">
                    Rp {product.price.toLocaleString("id-ID")}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {product.shopeeLink && (
                        <a
                            href={product.shopeeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-orange-500 text-white text-center rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-1"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-5H8l5-7v5h3l-5 7z" />
                            </svg>
                            Shopee
                        </a>
                    )}
                    {product.whatsappLink && (
                        <a
                            href={product.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-green-500 text-white text-center rounded-lg font-medium text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                        </a>
                    )}
                    {!product.shopeeLink && !product.whatsappLink && (
                        <span className="text-slate-400 text-sm italic">Hubungi penjual untuk info lebih lanjut</span>
                    )}
                </div>
            </div>
        </div>
    );
}
