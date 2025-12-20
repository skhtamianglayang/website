import { ReactNode } from "react";

interface SectionProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
    titleClassName?: string;
    id?: string;
}

export default function Section({
    title,
    subtitle,
    children,
    className = "",
    titleClassName = "",
    id,
}: SectionProps) {
    return (
        <section className={`py-16 ${className}`} id={id}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2
                        className={`text-2xl md:text-3xl font-bold text-slate-800 mb-2 relative inline-block ${titleClassName}`}
                    >
                        {title}
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                    </h2>
                    {subtitle && <p className="text-slate-600 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
                </div>
                {children}
            </div>
        </section>
    );
}
