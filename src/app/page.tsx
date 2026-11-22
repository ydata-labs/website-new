import { Header, Footer } from "@/components/ui";
import {
	Hero,
	Paths,
	Solutions,
	Advice,
	Healthcare,
	Products,
	Founder,
	Contact,
} from "@/components/sections";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("home");

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<Paths />
				<Solutions />
				<Advice />
				<Healthcare />
				<Products />
				<Founder />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
