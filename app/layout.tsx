import "./globals.css"
import Navbar from "./components/Navbar"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
	title: "w-eb",
	description: "Mentett állatok — w-eb",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="hu" className={cn("font-sans", geist.variable)}>
			<body className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
				<Navbar />

				<main className="flex-1">{children}</main>

				<footer className="bg-zinc-100 border-t">
					<div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-center gap-6">
						<button className="text-sm text-zinc-700 hover:underline">GYIK</button>
						<button className="text-sm text-zinc-700 hover:underline">Kapcsolat</button>
						<button className="text-sm text-zinc-700 hover:underline">Adomány</button>
					</div>
				</footer>
			</body>
		</html>
	)
}
