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

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Products />
                <Solutions />
                <About />
                <PortfolioSummary />
                <Partners />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
