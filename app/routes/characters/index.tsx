import { fetch } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { API_URL } from "~/constants";
import type { LoaderFunction } from "@remix-run/node";
import Header from "~/components/header";
import type { Character } from "~/types/character";
import type { Info } from "~/types/info";

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
      {<Header />}
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
            className="flex items-center rounded bg-teal-400 py-2 px-4 font-bold text-white hover:bg-teal-600"
            onClick={(e) => page <= 1 && e.preventDefault()}
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </Link>
          <p>
            Page {page}/{info.pages}
          </p>
          <Link
            to={`/characters?page=${parseInt(page.toString()) + 1}`}
            className="flex items-center rounded bg-teal-400 py-2 px-4 font-bold text-white hover:bg-teal-600"
            onClick={(e) => page > info.count - 1 && e.preventDefault()}
          >
            Next
            <svg
              className="ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </main>
    </>
  );
}
