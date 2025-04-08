import { ReactNode } from "react";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import Head from "next/head";
import config from "../../config";



interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>


            <Navbar />

            <main className="p-5">{children}</main>
            <Footer />
        </>
    );
}