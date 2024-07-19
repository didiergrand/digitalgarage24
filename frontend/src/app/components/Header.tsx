'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
    const pathname = usePathname(); // Utiliser usePathname 
    const router = useRouter(); // Utiliser useRouter pour accéder à la méthode back
    const isNavigationPage = pathname === "/navigation";

    const handleMenuClick = (e: React.MouseEvent) => {
        if (isNavigationPage) {
            e.preventDefault(); // Empêcher le comportement par défaut du lien
            router.back(); // Retourner à la page précédente
        }
    };

    return (
        <header className={`absolute w-screen mx-auto p-8 ${isNavigationPage ? 'active' : ''}`}>
            <div className="grid grid-cols-2">
                <div className="flex justify-start">
                    <Link href="/">
                        {isNavigationPage ? (
                            <img src="/Digitalgarage-DidierGrand-Logo-light.svg" alt="Logo" />
                        ) : (
                            <img src="/Digitalgarage-DidierGrand-Logo.svg" alt="Logo" />
                        )}
                    </Link>
                </div>
                <div className="flex justify-end items-center">
                    <Link href="/navigation" className="p-8" onClick={handleMenuClick}>
                        <div className="menu-button"></div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
