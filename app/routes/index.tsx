import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <Link to="/characters">
        <div className="relative sm:pb-16 sm:pt-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://www.numerama.com/wp-content/uploads/2021/11/rickandmorty-3-jpg.jpg"
                  alt="Rick and morty"
                />
                <div className="absolute inset-0 bg-[color:rgba(20,20,20,0.5)] mix-blend-multiply" />
              </div>
              <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
                <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                  <span className="block uppercase text-teal-500 drop-shadow-md">
                    Rick & Morty
                  </span>
                </h1>
                <div className="mx-auto mt-16 max-w-7xl text-center">
                  <Link
                    to="/characters"
                    className="text-center text-3xl uppercase text-teal-300"
                  >
                    characters
                  </Link>
                </div>
                <a href="https://remix.run">
                  <img
                    src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                    alt="Remix"
                    className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </main>
  );
}
