import { fetch } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { API_URL } from "~/constants";
import type { LoaderFunction } from "@remix-run/node";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [string];
  url: string;
  created: string;
};

type Info = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
};

type LoaderData = {
  info: Info;
  results: Array<Character>;
  page: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const res = await fetch(`${API_URL}character/?page=${page}`);
  const data = await res.json();
  return { ...data, page: page };
};
export default function Characters() {
  const { info, results, page } = useLoaderData<LoaderData>();
  return (
    <>
      <header>
        <Link
          to="/"
          className="block text-6xl font-extrabold uppercase tracking-tight text-teal-500 drop-shadow-md"
        >
          Rick & Morty
        </Link>
      </header>
      <main>
        <div className="flex flex-wrap justify-center gap-4">
          {results.map((character: Character) => {
            const { name, image, gender, species, status } = character;
            const tags = [gender, species, status];
            return (
              <Link to={character.id.toString()} key={character.id}>
                <div className="max-w-sm overflow-hidden rounded shadow-lg drop-shadow-2xl">
                  <img
                    className="w-full"
                    src={image}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-2">
                    <div className="mb-2 text-xl font-bold">{name}</div>
                  </div>
                  <div className="pty-2 px-6">
                    {tags.map((tag, i) => (
                      <span
                        key={`${tag}-${i}`}
                        className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center justify-around">
          <Link
            to={`/characters?page=${parseInt(page.toString()) - 1}`}
            className="rounded bg-teal-400 py-2 px-4 font-bold text-white hover:bg-teal-600"
            onClick={(e) => page <= 1 && e.preventDefault()}
          >
            Previous
          </Link>
          <p>
            Page {page}/{info.pages}
          </p>
          <Link
            to={`/characters?page=${parseInt(page.toString()) + 1}`}
            className="rounded bg-teal-400 py-2 px-4 font-bold text-white hover:bg-teal-600"
            onClick={(e) => page > info.count - 1 && e.preventDefault()}
          >
            Previous
          </Link>
        </div>
      </main>
    </>
  );
}
