import { mainNav } from "@/data/navigation";
import { posts } from "@/data/posts";
import { HeaderNav } from "./HeaderNav";

// A server component, so the post data stays out of the browser.
// "Blog" joins the menu when the blog has its first post.
export function Header() {
	return <HeaderNav items={mainNav(posts.length > 0)} />;
}
