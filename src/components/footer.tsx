import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-cyan-800 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-lg font-bold">GameHub</h3>
                        <p className="text-cyan-100">
                            Play thousands of free online games on GameHub, your trusted source of free gaming fun since 2023.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold">Categories</h3>
                        <ul className="space-y-2 text-cyan-100">
                            <li>
                                <Link href="/categories/action" className="hover:text-white transition-colors">
                                    Action Games
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/racing" className="hover:text-white transition-colors">
                                    Racing Games
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/puzzle" className="hover:text-white transition-colors">
                                    Puzzle Games
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/shooting" className="hover:text-white transition-colors">
                                    Shooting Games
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold">Information</h3>
                        <ul className="space-y-2 text-cyan-100">
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold">Connect</h3>
                        <p className="mb-4 text-cyan-100">Follow us on social media for updates and new games!</p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                                Facebook
                            </Link>
                            <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                                Twitter
                            </Link>
                            <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                                Instagram
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-cyan-700 pt-6 text-center text-cyan-100">
                    <p>&copy; {new Date().getFullYear()} GameHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
