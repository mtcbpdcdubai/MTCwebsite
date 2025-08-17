export default function Events() {
  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-center mb-8">Events</h1>
        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          Discover our upcoming and past events
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl mb-4">Upcoming Events</h3>
            <p className="text-gray-300">
              Stay tuned for exciting upcoming events!
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl mb-4">Past Events</h3>
            <p className="text-gray-300">
              Check out our successful past events.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl mb-4">Workshops</h3>
            <p className="text-gray-300">
              Technical workshops and learning sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
