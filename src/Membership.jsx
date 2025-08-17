export default function Membership() {
  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-center mb-8">Membership</h1>
        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          Join the Microsoft Tech Club community
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl mb-6">Why Join MTC?</h3>
            <ul className="space-y-4 text-gray-300">
              <li>• Access to exclusive workshops and events</li>
              <li>• Networking opportunities with tech professionals</li>
              <li>• Hands-on experience with Microsoft technologies</li>
              <li>• Career development and mentorship</li>
              <li>• Student ambassador opportunities</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl mb-6">How to Join</h3>
            <div className="space-y-4 text-gray-300">
              <p>1. Fill out our membership application form</p>
              <p>2. Attend our orientation session</p>
              <p>3. Start participating in events and activities</p>
              <p>4. Apply for ambassador programs (optional)</p>
            </div>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
