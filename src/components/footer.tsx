import Link from "next/link"
import config from '../../config';
import Image from 'next/image'

interface FooterProps {
    variant?: "default" | "simple" | "dark" | "columns" | "modern"
}

export default function Footer({ variant = "default" }: FooterProps) {


    // Default variant
    return (
        <footer className="border-t border-b-purple-900 py-8 bg-purple-900 text-secondary">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <span>{config.siteName}</span>
                        </div>
                    </div>
                    <nav className="flex justify-center flex-wrap gap-6 mt-4 md:mt-0">


                        {config.FooterMenu.map((item, index) => (
                            <Link key={index} href={item.url} className="text-sm">
                                {item.title}
                            </Link>

                        ))}



                    </nav>
                </div>
                <div className="mt-8 pt-6 border-t text-center md:flex md:justify-between md:text-left">
                    <p className="text-sm ">© {new Date().getFullYear()} {config.siteName}. All rights reserved.</p>
                    <p className="text-sm t mt-2 md:mt-0">Coded with love by <a href="https://oksurya.com" target="_blank">Oksurya</a></p>
                </div>
            </div>
        </footer>
    )
}

