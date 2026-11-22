import { Header, Footer, Button, ArrowIcon } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
	return (
		<>
			<Header />
			<main className="pt-40 pb-32">
				<div className="max-w-md mx-auto px-4 md:px-8">
					<p className="mb-3 font-heading text-sm text-accent">{"// 404"}</p>
					<h1 className="text-h2 md:text-h1 mb-4">Page not found</h1>
					<p className="text-body-lg text-muted mb-8">
						This address does not exist. It may have moved, or the link may be
						wrong.
					</p>
					<Button href="/" icon={<ArrowIcon />}>
						Go to the home page
					</Button>
				</div>
			</main>
			<Footer />
		</>
	);
}
