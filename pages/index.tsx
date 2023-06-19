import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome | MatíasVerdier.com</title>
      </Head>

      <div className="relative bg-gray-50">
        <main className="h-screen lg:relative">
          <div className="flex h-full flex-col place-content-center text-center lg:w-1/2 lg:text-left">
            <div className="px-4 sm:px-8 xl:pr-16">
              <h1 className="mx-auto text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:max-w-lg md:text-6xl lg:mx-0 lg:max-w-lg lg:text-5xl xl:text-6xl">
                <span className="inline sm:block md:inline">
                  <span>Welcome to</span>
                  <span className="mx-2 text-indigo-700">my place</span>
                </span>
                <span className="inline sm:block md:inline">on the web!</span>
              </h1>
              <p className="mt-3 text-lg text-gray-500 sm:text-xl md:mt-5">
                Hello there! My name is Matías Verdier, Sr. Full Stack Engineer
                from Uruguay. I&apos;m passionate about learning and sharing my
                knowledge with others. My main focus is the web, specially
                JavaScript and frameworks like Vue and React.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="https://twitter.com/matiasvj"
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-8 py-3 text-base font-medium leading-none text-white hover:bg-blue-600 md:px-10 md:py-4 md:text-lg"
                  >
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-2 inline h-6 w-6 text-white"
                      >
                        <g>
                          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                        </g>
                      </svg>
                      Follow Me
                    </span>
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:ml-3 sm:mt-0">
                  <Link
                    href="/posts"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium leading-none text-gray-600 hover:bg-gray-100 md:px-10 md:py-4 md:text-lg"
                  >
                    Read the blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="xs:hidden relative lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <Image
              className="absolute inset-0 h-full w-full object-cover"
              src="https://res.cloudinary.com/matiasvj/image/upload/f_auto,c_limit,w_750,q_auto/v1686880440/matiasverdier.com/e06f9389-e38d-417e-bee6-fc7d29cf311b_21294374-7C27-48F3-BE18-9640CDC1B8DB_bzolvz.jpg"
              alt="Matías Verdier"
              fill
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-indigo-900 opacity-60"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
