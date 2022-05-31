import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header>
      <Link
        to="/"
        className="block text-6xl font-extrabold uppercase tracking-tight text-teal-500 drop-shadow-md"
      >
        Rick & Morty
      </Link>
    </header>
  );
}
