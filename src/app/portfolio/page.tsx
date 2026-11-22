import { Header, Footer, SectionHeader, Button, ArrowIcon } from "@/components/ui";
import {
	founderInfo,
	services,
	allProjects,
	caseStudies,
	activities,
} from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("portfolio");

// Icon components for activities
const activityIcons: Record<string, React.ReactNode> = {
	book: (
		<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
		</svg>
	),
	microphone: (
		<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
		</svg>
	),
	pen: (
		<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
		</svg>
	),
};

export default function PortfolioPage() {
	return (
        <>
            <Header />
            <main className="pt-24">
                {/* Hero Section */}
                <section className="py-16 lg:py-24 bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white relative overflow-hidden">
                    {/* Background patterns */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-40 h-40 border border-white/30 rounded-full" />
                        <div className="absolute bottom-20 right-20 w-60 h-60 border border-white/20 rounded-full" />
                        <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white/20 rotate-45" />
                    </div>

                    <div className="container-xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-heading mb-6 animate-fade-in">
                                Healthcare AI Consulting
                            </span>
                            <h1 className="text-h1 md:text-display mb-6 animate-fade-in-up text-white">
                                Driving Innovation in AI & Data Science
                            </h1>
                            <p className="text-xl text-white/80 mb-8 animate-fade-in-up delay-100">
                                Empowering Businesses with Cutting-Edge
                                Artificial Intelligence Solutions
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
                                <Button
                                    href="/#contact"
                                    variant="primary"
                                    icon={<ArrowIcon />}
                                >
                                    Start Your AI Journey
                                </Button>
                                <Button
                                    href="#projects"
                                    variant="outline"
                                    className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                                >
                                    Explore Projects
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="container-xl mx-auto px-4 md:px-8">
                        <SectionHeader
                            eyebrow="About yDataLabs"
                            title="Transforming Healthcare with AI"
                            description="At yDataLabs, we are at the forefront of healthcare AI consulting and medical data science, dedicated to transforming complex challenges into innovative solutions."
                        />

                        <div className="mt-16 grid lg:grid-cols-2 gap-12">
                            {/* Vision Card */}
                            <div className="bg-slate-bg rounded-3xl p-8 lg:p-10">
                                <h3 className="text-h3 text-navy mb-4">
                                    Our Vision
                                </h3>
                                <p className="text-slate-600 mb-6">
                                    We envision a future where data-driven
                                    insights are seamlessly integrated into
                                    every facet of business, enabling smarter
                                    decisions, fostering innovation, and
                                    creating sustainable value.
                                </p>
                                <p className="text-slate-600">
                                    yDataLabs is built on the principle that
                                    advanced AI should be accessible and
                                    actionable, providing clear, measurable
                                    benefits to our clients.
                                </p>
                            </div>

                            {/* Approach Card */}
                            <div className="bg-slate-bg rounded-3xl p-8 lg:p-10">
                                <h3 className="text-h3 text-navy mb-4">
                                    Our Approach
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        {
                                            title: "End-to-End Delivery",
                                            desc: "From strategy to deployment and continuous optimization",
                                        },
                                        {
                                            title: "Innovation & Research",
                                            desc: "Integrating latest AI, ML, and NLP advancements",
                                        },
                                        {
                                            title: "Client-Centric Solutions",
                                            desc: "Tailored approaches for unique challenges",
                                        },
                                        {
                                            title: "Impact-Driven Results",
                                            desc: "Measurable outcomes in efficiency and growth",
                                        },
                                    ].map(item => (
                                        <li
                                            key={item.title}
                                            className="flex items-start gap-3"
                                        >
                                            <svg
                                                className="w-5 h-5 text-teal flex-shrink-0 mt-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <div>
                                                <span className="font-heading font-semibold text-navy">
                                                    {item.title}:
                                                </span>
                                                <span className="text-slate-600 ml-1">
                                                    {item.desc}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Founder Section */}
                <section className="py-20 lg:py-28 bg-slate-bg">
                    <div className="container-xl mx-auto px-4 md:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-navy via-navy-light to-teal-dark rounded-3xl p-8 lg:p-12 text-white text-center relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-32 h-32 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute bottom-0 right-0 w-48 h-48 border border-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

                                <div className="relative z-10">
                                    <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-heading mb-6">
                                        Our Founder
                                    </span>
                                    <h2 className="text-h2 md:text-h1 mb-6 text-white">
                                        {founderInfo.name}
                                    </h2>

                                    <div className="space-y-4 text-white/85 text-left max-w-3xl mx-auto">
                                        {founderInfo.bio.map(
                                            (paragraph, index) => (
                                                <p key={index}>{paragraph}</p>
                                            )
                                        )}
                                    </div>

                                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                                        {founderInfo.achievements.map(
                                            achievement => {
                                                const text =
                                                    typeof achievement ===
                                                    "string"
                                                        ? achievement
                                                        : achievement.text;
                                                const link =
                                                    typeof achievement ===
                                                    "string"
                                                        ? undefined
                                                        : achievement.link;
                                                const key =
                                                    typeof achievement ===
                                                    "string"
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
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="container-xl mx-auto px-4 md:px-8">
                        <SectionHeader
                            eyebrow="Our Services"
                            title="Comprehensive Healthcare AI Solutions"
                            description="We offer a full suite of services designed to guide organizations through every stage of their AI and data science journey."
                        />

                        <div className="mt-16 grid md:grid-cols-2 gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={service.title}
                                    className={cn(
                                        "bg-slate-bg rounded-2xl p-8 border-l-4 border-teal",
                                        "animate-fade-in-up"
                                    )}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <h3 className="text-h4 text-navy mb-4">
                                        {service.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {service.items.map(item => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2 text-slate-600 text-sm"
                                            >
                                                <svg
                                                    className="w-4 h-4 text-teal flex-shrink-0 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-20 lg:py-28 bg-slate-bg">
                    <div className="container-xl mx-auto px-4 md:px-8">
                        <SectionHeader
                            eyebrow="Healthcare & Life Sciences Projects"
                            title="GenAI-Focused Case Studies"
                            description="Key projects demonstrating our expertise in Healthcare & Life Sciences, with emphasis on Generative AI applications."
                        />

                        <div className="mt-16 overflow-x-auto">
                            <table className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
                                <thead>
                                    <tr className="bg-gradient-to-r from-navy to-navy-light text-white">
                                        <th className="px-6 py-4 text-left font-heading font-semibold">
                                            Project
                                        </th>
                                        <th className="px-6 py-4 text-left font-heading font-semibold">
                                            Customer
                                        </th>
                                        <th className="px-6 py-4 text-left font-heading font-semibold">
                                            Duration
                                        </th>
                                        <th className="px-6 py-4 text-left font-heading font-semibold hidden lg:table-cell">
                                            Description
                                        </th>
                                        <th className="px-6 py-4 text-left font-heading font-semibold">
                                            Impact
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProjects
                                        .slice(0, 10)
                                        .map((project, index) => (
                                            <tr
                                                key={project.id}
                                                className={cn(
                                                    "border-b border-slate-100 hover:bg-slate-50 transition-colors",
                                                    index % 2 === 0 &&
                                                        "bg-slate-50/50"
                                                )}
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="font-heading font-semibold text-navy">
                                                        {project.title}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-teal font-medium">
                                                    {project.customer}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 text-sm">
                                                    {project.duration}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 text-sm hidden lg:table-cell max-w-md">
                                                    {project.description}
                                                </td>
                                                <td className="px-6 py-4 text-emerald font-medium text-sm">
                                                    {project.impact}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Case Studies Section */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="container-xl mx-auto px-4 md:px-8">
                        <SectionHeader
                            eyebrow="Other Projects"
                            title="More Case Studies"
                            description="Our extensive portfolio includes numerous additional projects across various healthcare and life sciences applications."
                        />

                        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {caseStudies.map((study, index) => (
                                <div
                                    key={study.title}
                                    className={cn(
                                        "bg-slate-bg rounded-2xl p-6 border-l-4 border-teal hover:border-navy transition-colors",
                                        "animate-fade-in-up"
                                    )}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <h4 className="font-heading font-semibold text-navy mb-2">
                                        {study.title}
                                    </h4>
                                    <p className="text-sm text-teal mb-2">
                                        {study.client} | {study.period}
                                    </p>
                                    <p className="text-slate-600 text-sm mb-3">
                                        {study.description}
                                    </p>
                                    <p className="text-emerald text-sm font-medium">
                                        {study.result}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Activities Section */}
                <section className="py-20 lg:py-28 bg-slate-bg">
                    <div className="container-xl mx-auto px-4 md:px-8">
                        <SectionHeader
                            eyebrow="Activities"
                            title="Papers, Events & Publications"
                            description="Dr. Veysel Kocaman and yDataLabs are actively engaged in the global AI and healthcare community."
                        />

                        <div className="mt-16 grid md:grid-cols-3 gap-8">
                            {activities.map((activity, index) => (
                                <div
                                    key={activity.title}
                                    className={cn(
                                        "bg-white rounded-2xl p-8 text-center shadow-sm card-hover",
                                        "animate-fade-in-up"
                                    )}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal/10 to-navy/10 flex items-center justify-center text-teal mx-auto mb-6">
                                        {activityIcons[activity.icon]}
                                    </div>
                                    <h3 className="text-h4 text-navy mb-4">
                                        {activity.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm">
                                        {activity.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 lg:py-28 bg-gradient-to-br from-teal to-teal-dark text-white">
                    <div className="container-xl mx-auto px-4 md:px-8 text-center">
                        <h2 className="text-h2 md:text-h1 mb-6 text-white">
                            Ready to Transform Your Healthcare Data?
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Let&apos;s discuss how yDataLabs can help drive
                            innovation in your organization with cutting-edge AI
                            solutions.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                href="/#contact"
                                variant="primary"
                                size="lg"
                                className="bg-navy hover:bg-navy-light"
                                icon={<ArrowIcon />}
                            >
                                Get in Touch
                            </Button>
                            <a
                                href="mailto:info@ydatalabs.nl"
                                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full text-white hover:bg-white/10 transition-colors font-heading font-medium"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                info@ydatalabs.nl
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

