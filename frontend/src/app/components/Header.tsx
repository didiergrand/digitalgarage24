'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

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
        <header className={`absolute w-full z-10 p-8 ${isNavigationPage ? 'active' : ''}`}>
            <div className="grid grid-cols-2">
                <div className="flex justify-start">
                    <Link href="/">
                        {isNavigationPage ? (
                            <Image src="/Digitalgarage-DidierGrand-Logo-light.svg" alt="Logo" width={125} height={125} />
                        ) : (
                            <Image src="/Digitalgarage-DidierGrand-Logo.svg" alt="Logo" width={125} height={125}  />
                        )}
                    </Link>
                </div>
                <div className="flex justify-end items-center">
                    <Link href="/navigation" className="p-16" onClick={handleMenuClick}>
                        <div className="menu-button"></div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
