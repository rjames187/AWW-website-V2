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

export function getPhoneString(phone: string | number) {
  phone = String(phone);
  return `${phone.substring(0, 3)}-${phone.substring(3, 6)}-
            ${phone.substring(6, 10)}`;
}