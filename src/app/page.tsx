import { Header, Footer } from "@/components/ui";
import {
    Hero,
    Paths,
    Advice,
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
                <Paths />
                <Solutions />
                <Advice />
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
