import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome | MatíasVerdier.com</title>
      </Head>

      <div className="relative bg-gray-50">
        <main className="lg:relative h-screen">
          <div className="lg:w-1/2 h-full flex flex-col place-content-center text-center lg:text-left">
            <div className="px-4 sm:px-8 xl:pr-16">
              <h1 className="mx-auto lg:mx-0 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl md:max-w-lg lg:max-w-lg">
                <span className="inline sm:block md:inline">
                  <span>Welcome to</span>
                  <span className="text-indigo-700 mx-2">my place</span>
                </span>
                <span className="inline sm:block md:inline">on the web!</span>
              </h1>
              <p className="mt-3 text-lg text-gray-500 sm:text-xl md:mt-5">
                Hello there! My name is Matías Verdier, I&apos;m a Full Stack
                Software Developer from Uruguay. I&apos;m passionate about
                learning and sharing my knowledge with others. My main focus is
                the web, specially JavaScript and frameworks like Vue and React.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="https://twitter.com/matiasvj"
                    target="_blank"
                    rel="noreferrer"
                    className="leading-none w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
                  >
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-white h-6 w-6 mr-2 inline"
                      >
                        <g>
                          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                        </g>
                      </svg>
                      Follow Me
                    </span>
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="https://github.com/MatiasVerdier"
                    target="_blank"
                    rel="noreferrer"
                    className="leading-none w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                  >
                    <span>
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="text-gray-800 h-6 w-6 mr-2 inline"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        ></path>
                      </svg>
                      See some code
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative xs:hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <Image
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.prismic.io/matiasverdier-com/e06f9389-e38d-417e-bee6-fc7d29cf311b_21294374-7C27-48F3-BE18-9640CDC1B8DB.jpeg"
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
