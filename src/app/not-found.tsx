import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h2 className="text-4xl font-bold text-red-600 mb-4">
        Not found page. Error: 404{' '}
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        Could not find requested resource
      </p>
      <Link
        href="/"
        className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Return main Page
      </Link>
    </div>
  );
};

export default NotFound;
