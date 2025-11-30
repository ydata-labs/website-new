import { Button, ArrowIcon } from "@/components/ui";
import { coreFeatures } from "@/data/solutions";

export function Hero() {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden bg-slate-bg">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-gradient-mesh" />
			<div className="absolute inset-0 bg-grid-pattern opacity-30" />

			{/* Decorative Circles */}
			<div className="absolute top-20 right-10 w-72 h-72 bg-teal/10 rounded-full blur-3xl animate-pulse-slow" />
			<div className="absolute bottom-20 left-10 w-96 h-96 bg-navy/5 rounded-full blur-3xl animate-pulse-slow delay-200" />

			{/* Floating geometric shapes */}
			<div className="absolute top-1/4 right-1/4 w-4 h-4 bg-teal rotate-45 animate-float opacity-40" />
			<div className="absolute top-1/3 left-1/5 w-3 h-3 bg-navy/30 rounded-full animate-float delay-300" />
			<div className="absolute bottom-1/3 right-1/5 w-5 h-5 border-2 border-teal/30 rotate-12 animate-float delay-500" />

			<div className="container-xl mx-auto px-4 md:px-8 pt-32 pb-20 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Content */}
					<div className="animate-fade-in-up">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-8 border border-slate-100">
							<span className="text-xl">🤖</span>
							<span className="text-sm font-heading font-medium text-navy">
								Next-Gen AI & Data Intelligence
							</span>
						</div>

						{/* Heading */}
						<h1 className="text-h1 md:text-display text-navy mb-6 leading-tight">
							Unlock the Power of{" "}
							<span className="relative inline-block">
								<span className="relative z-10">Your Data</span>
								<span className="absolute bottom-2 left-0 w-full h-3 bg-teal/30 -z-0" />
							</span>
						</h1>

						{/* Description */}
						<p className="text-body-lg text-slate-600 mb-8 max-w-xl">
							Harness cutting-edge AI and data science to transform your
							business. From predictive analytics to generative AI, we deliver
							innovative solutions that drive growth, optimize operations, and
							create competitive advantages in today&apos;s data-driven world.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-wrap gap-4 mb-12">
							<Button
								href="/#contact"
								variant="primary"
								size="lg"
								icon={<ArrowIcon />}
							>
								Start Your AI Journey
							</Button>
							<Button href="/#products" variant="outline" size="lg">
								Explore Products
							</Button>
						</div>

						{/* Stats */}
						<div className="flex flex-wrap gap-8 pt-8 border-t border-slate-200">
							{coreFeatures.map((feature, index) => (
								<div
									key={feature.title}
									className="animate-fade-in-up"
									style={{ animationDelay: `${(index + 2) * 100}ms` }}
								>
									<div className="text-h2 font-heading font-bold text-navy">
										{feature.stat}
									</div>
									<div className="text-body-sm text-slate-500">
										{feature.statLabel}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right Visual */}
					<div className="relative hidden lg:block animate-fade-in delay-200">
						{/* Main Visual Container */}
						<div className="relative">
							{/* Abstract Data Visualization */}
							<div className="relative w-full aspect-square max-w-lg mx-auto">
								{/* Outer ring */}
								<div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 animate-[spin_60s_linear_infinite]" />

								{/* Middle ring */}
								<div className="absolute inset-8 rounded-full border border-teal/30" />

								{/* Inner gradient circle */}
								<div className="absolute inset-16 rounded-full bg-gradient-to-br from-navy via-navy-light to-teal shadow-2xl flex items-center justify-center">
									<div className="text-center text-white p-8">
										<div className="text-6xl mb-4">🧬</div>
										<div className="font-heading font-bold text-xl">
											Healthcare AI
										</div>
										<div className="text-sm text-white/70 mt-2">
											Transforming Medicine
										</div>
									</div>
								</div>

								{/* Floating nodes */}
								<div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float">
									<span className="text-2xl">📊</span>
								</div>
								<div className="absolute bottom-20 left-5 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float delay-300">
									<span className="text-xl">🔬</span>
								</div>
								<div className="absolute top-1/3 left-0 w-12 h-12 bg-teal rounded-xl shadow-lg flex items-center justify-center animate-float delay-500">
									<span className="text-lg">💡</span>
								</div>
								<div className="absolute bottom-10 right-20 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float delay-700">
									<span className="text-xl">🎯</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom wave */}
			<div className="absolute bottom-0 left-0 right-0">
				<svg
					viewBox="0 0 1440 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full"
				>
					<path
						d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
						fill="white"
					/>
				</svg>
			</div>
		</section>
	);
}

