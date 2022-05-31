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

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`${API_URL}character/${params.id}`);
  const data = await res.json();
  return data;
};

export default function CharacterId() {
  const characterData = useLoaderData<Character>();
  const { id, image, name, species, gender, status, episode } = characterData;
  const episodes: string[] = episode.map((item) => item.split("episode/")[1]);
  const tags: string[] = [gender, species, status, ...episodes];
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
        <div className="mx-auto max-w-sm overflow-hidden rounded shadow-lg drop-shadow-2xl">
          <img className="w-full" src={image} alt="Sunset in the mountains" />
          <div className="px-6 py-2">
            <h1 className="mb-2 text-xl font-bold">{name}</h1>
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
        <div className="flex justify-around">
          {id > 1 && (
            <Link
              to={`/characters/${(id + 1).toString()}`}
              className="rounded bg-teal-400 py-2 px-4 font-bold text-white hover:bg-teal-600"
            >
              Previous
            </Link>
          )}

          <Link
            to={`/characters/${(id + 1).toString()}`}
            className="rounded bg-teal-400 py-2 px-4 font-bold text-white hover:bg-teal-600"
          >
            Next
          </Link>
        </div>
      </main>
    </>
  );
}
