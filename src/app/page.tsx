import { Header, Footer } from "@/components/ui";
import {
    Hero,
    Products,
    Solutions,
    About,
    PortfolioSummary,
    Partners,
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
                <Solutions />
                <Products />
                <About />
                <PortfolioSummary />
                <Partners />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
