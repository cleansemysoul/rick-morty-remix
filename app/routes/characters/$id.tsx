import { Link, useLoaderData } from "@remix-run/react";
import { API_URL } from "~/constants";
import type { LoaderFunction } from "@remix-run/node";
import Header from "~/components/header";
import type { Character } from "~/types/character";

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
      {<Header />}
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
              className="flex items-center rounded bg-teal-400 py-2 px-4 font-bold text-white hover:bg-teal-600"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Previous
            </Link>
          )}

          <Link
            to={`/characters/${(id + 1).toString()}`}
            className="flex items-center rounded bg-teal-400 py-2 px-4 font-bold text-white hover:bg-teal-600"
          >
            Next
            <svg
              className="ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </main>
    </>
  );
}
