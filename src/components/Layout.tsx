import { ReactNode } from "react";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import Head from "next/head";
import config from "../../config";
import { Inter } from "next/font/google"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>




            <html lang="en">
                <body className={inter.className}>
                    <GoogleAnalytics gaId={config.googleAnalyticsId} />

                    <Navbar />
                    <main className="min-h-screen max-h-full bg-purple-100"> <div className="container mx-auto ">
                        {children}
                    </div></main>
                    <Footer />
                </body>
            </html>
        </>
    );
}