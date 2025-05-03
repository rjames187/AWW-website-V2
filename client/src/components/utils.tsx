import { Page } from "../App";

export function renderPageList(pages: Page[]) {
    return pages.map((page) => (
        <li key={page.name}>
            <a href="#">{page.name}</a>
        </li>
    ));
}