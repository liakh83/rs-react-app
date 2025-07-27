import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About This App</h1>
      <p className="mb-4">
        This application is a small React project built as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          RS School React course
        </a>
        . It demonstrates routing, data fetching, localStorage handling,
        pagination, and detail views using the{' '}
        <a
          href="https://pokeapi.co/"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          PokéAPI
        </a>
        .
      </p>

      <p className="mb-4">
        Built with by{' '}
        <a
          href="https://github.com/liakh83"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vladimir Liakh
        </a>
        .
      </p>

      <p className="text-sm text-gray-500">
        You can find the full source code on{' '}
        <a
          href="https://github.com/liakh83/rs-react-app"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          RS-REACT-APP
        </a>
        .
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
