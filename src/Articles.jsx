export default function Articles() {
  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-center mb-8">Articles</h1>
        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          Technical blogs and insights from our community
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 hover:scale-105 transition">
            <h3 className="text-xl mb-4">Getting Started with Azure</h3>
            <p className="text-gray-300 mb-4">
              Learn the basics of Microsoft Azure cloud platform and its core
              services.
            </p>
            <span className="text-blue-400 text-sm">March 15, 2024</span>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 hover:scale-105 transition">
            <h3 className="text-xl mb-4">React Best Practices</h3>
            <p className="text-gray-300 mb-4">
              Essential tips and patterns for building scalable React
              applications.
            </p>
            <span className="text-blue-400 text-sm">March 10, 2024</span>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 hover:scale-105 transition">
            <h3 className="text-xl mb-4">Machine Learning Fundamentals</h3>
            <p className="text-gray-300 mb-4">
              Introduction to ML concepts and practical implementation examples.
            </p>
            <span className="text-blue-400 text-sm">March 5, 2024</span>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
