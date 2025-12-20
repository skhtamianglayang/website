import Link from "next/link";

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
    slug: string;
}

interface NewsCardProps {
    news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
    return (
        <Link href={`/berita/${news.slug}`}>
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full">
                <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-medium bg-emerald-600 text-white rounded-full shadow">
                            {news.date}
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    <h3 className="font-semibold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {news.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{news.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-sm group-hover:gap-2 transition-all">
                        Baca Selengkapnya
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </article>
        </Link>
    );
}
