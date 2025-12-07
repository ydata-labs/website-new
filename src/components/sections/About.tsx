import { Button, ArrowIcon } from "@/components/ui";
import { founderInfo } from "@/data/portfolio";

export function About() {
	return (
        <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
            <div className="container-xl mx-auto px-4 md:px-8">
                {/* Company Story */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                    {/* Visual */}
                    <div className="relative animate-fade-in">
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Decorative elements */}
                            <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-navy/20 rounded-3xl transform rotate-3" />
                            <div className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-mesh" />
                                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal to-navy flex items-center justify-center mb-6">
                                        <span className="text-4xl">🎯</span>
                                    </div>
                                    <h3 className="text-h3 text-navy mb-3">
                                        Our Vision
                                    </h3>
                                    <p className="text-slate-600">
                                        A future where data-driven insights are
                                        seamlessly integrated into every facet
                                        of business, enabling smarter decisions
                                        and fostering innovation.
                                    </p>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                                <span className="text-2xl">📊</span>
                                <p className="text-xs font-heading text-navy mt-1">
                                    Analytics
                                </p>
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-float delay-300">
                                <span className="text-2xl">🔬</span>
                                <p className="text-xs font-heading text-navy mt-1">
                                    Research
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="animate-fade-in-up delay-200">
                        <span className="inline-flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-heading font-medium rounded-full uppercase tracking-wider">
                                Our Story
                            </span>
                            <span className="text-slate-500 font-medium">
                                Data Science & AI Experts
                            </span>
                        </span>

                        <h2 className="text-h2 md:text-h1 text-navy mb-6">
                            Transforming Business with{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10">
                                    Data Intelligence
                                </span>
                                <span className="absolute bottom-1 left-0 w-full h-3 bg-amber/30 -z-0" />
                            </span>
                        </h2>

                        <p className="text-body-lg text-slate-600 mb-6">
                            At yDataLabs, we are at the forefront of healthcare
                            AI consulting and medical data science, dedicated to
                            transforming complex challenges into innovative
                            solutions.
                        </p>

                        <p className="text-body text-slate-500 mb-8">
                            With a specialized focus on the Healthcare and Life
                            Sciences industry for the last decade, our mission
                            is to empower organizations to harness the full
                            potential of their data, driving strategic growth
                            and operational efficiency through cutting-edge
                            artificial intelligence and machine learning
                            applications.
                        </p>

                        {/* Key points */}
                        <div className="space-y-4 mb-8">
                            {[
                                {
                                    num: "01",
                                    title: "Industry Applications",
                                    desc: "From retail and e-commerce to healthcare and finance, our solutions transform industries.",
                                },
                                {
                                    num: "02",
                                    title: "Advanced Technologies",
                                    desc: "Utilizing cutting-edge algorithms including Random Forest, XGBoost, and Deep Learning.",
                                },
                            ].map(item => (
                                <div
                                    key={item.num}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center flex-shrink-0">
                                        <span className="font-heading font-bold text-navy text-sm">
                                            {item.num}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-semibold text-navy mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-500 text-sm">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            href="/#contact"
                            variant="outline"
                            icon={<ArrowIcon />}
                        >
                            Learn More About Us
                        </Button>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="bg-gradient-to-br from-navy via-navy-light to-navy-dark rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-40 h-40 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-60 h-60 border border-white/20 rounded-full translate-x-1/2 translate-y-1/2" />
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-heading mb-6">
                            Meet Our Founder
                        </span>

                        <h3 className="text-h2 md:text-h1 mb-6 text-white">
                            {founderInfo.name}
                        </h3>

                        <p className="text-white/80 text-body-lg mb-8 max-w-2xl mx-auto">
                            {founderInfo.bio[0]}
                        </p>

                        {/* Achievements */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {founderInfo.achievements
                                .slice(0, 3)
                                .map((achievement, index) => {
                                    const text =
                                        typeof achievement === "string"
                                            ? achievement
                                            : achievement.text;
                                    const link =
                                        typeof achievement === "string"
                                            ? undefined
                                            : achievement.link;
                                    const key =
                                        typeof achievement === "string"
                                            ? achievement
                                            : achievement.text;

                                    const content = (
                                        <>
                                            <svg
                                                className="w-4 h-4 text-teal-light"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {text}
                                        </>
                                    );

                                    if (link) {
                                        return (
                                            <a
                                                key={key}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                                            >
                                                {content}
                                            </a>
                                        );
                                    }

                                    return (
                                        <span
                                            key={key}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm"
                                        >
                                            {content}
                                        </span>
                                    );
                                })}
                        </div>

                        <Button
                            href="/portfolio"
                            variant="secondary"
                            icon={<ArrowIcon />}
                        >
                            View Full Portfolio
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

