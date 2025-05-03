import { Link } from "react-router-dom";
import { Page } from "../App";

export function renderPageList(pages: Page[]) {
    return pages.map((page) => (
        <li key={page.name}>
            <Link to={page.href}>
                {page.name}
            </Link>
        </li>
    ));
}