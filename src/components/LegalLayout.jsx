import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/** Shared chrome for Termeni / Confidențialitate / Cookies. */
export const LegalLayout = ({ title, intro, lastUpdated, children }) => (
    <main className="min-h-screen bg-[#fafbfc] pt-28 sm:pt-36 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-gray-500 font-bold text-sm mb-8 hover:text-brand-600 transition-colors shadow-sm"
            >
                <ArrowLeft size={16} />
                Înapoi la pagina principală
            </Link>

            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">{title}</h1>

            {intro ? <p className="text-lg text-gray-600 leading-relaxed mb-4">{intro}</p> : null}

            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-10">
                Ultima actualizare: {lastUpdated}
            </p>

            <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-gray-100/60 border border-gray-100 space-y-10">
                {children}
            </div>
        </div>
    </main>
);

export const Section = ({ id, number, title, children }) => (
    <section id={id} className="scroll-mt-28">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">
            {number ? <span className="text-brand-600">{number}. </span> : null}
            {title}
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">{children}</div>
    </section>
);

export const Bullets = ({ items }) => (
    <ul className="list-disc pl-5 space-y-2 marker:text-brand-500">
        {items.map((item, i) => (
            <li key={i}>{item}</li>
        ))}
    </ul>
);

export const Callout = ({ tone = 'brand', children }) => {
    const tones = {
        brand: 'bg-brand-50 border-brand-200 text-brand-900',
        warn: 'bg-amber-50 border-amber-200 text-amber-900',
        gray: 'bg-gray-50 border-gray-200 text-gray-700',
    };
    return (
        <div className={`rounded-2xl border p-5 text-sm leading-relaxed font-medium ${tones[tone]}`}>
            {children}
        </div>
    );
};

/** Definition-style table used for the data-processing and cookie inventories. */
export const DataTable = ({ headers, rows }) => (
    <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full min-w-[34rem] text-sm border-collapse">
            <thead>
                <tr className="text-left">
                    {headers.map((h) => (
                        <th
                            key={h}
                            className="border-b-2 border-gray-200 pb-3 pr-4 font-black text-gray-900 uppercase tracking-wider text-[11px] align-bottom"
                        >
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="align-top">
                        {row.map((cell, j) => (
                            <td key={j} className="border-b border-gray-100 py-3 pr-4 text-gray-600 leading-relaxed">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const Ext = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-600 font-bold underline underline-offset-2 hover:text-brand-700 break-words"
    >
        {children}
    </a>
);

export const Internal = ({ to, children }) => (
    <Link to={to} className="text-brand-600 font-bold underline underline-offset-2 hover:text-brand-700">
        {children}
    </Link>
);

export default LegalLayout;
