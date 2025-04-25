
const Privacy = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Privacy Policy</h1>
    <p className="text-lg text-gray-700 mb-8">
      We take your privacy seriously. This policy describes how we handle and protect your data.
    </p>
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto space-y-6">
      <section>
        <h3 className="font-semibold text-xl mb-3">Data Collection</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Profile information you provide (name, location, etc.)</li>
          <li>Communication data between guides and travelers</li>
          <li>Booking and transaction information</li>
          <li>Usage data and preferences</li>
        </ul>
      </section>
      
      <section>
        <h3 className="font-semibold text-xl mb-3">How We Use Your Data</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>To facilitate bookings and connections between guides and travelers</li>
          <li>To improve our services and user experience</li>
          <li>To ensure platform safety and security</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>
      
      <section>
        <h3 className="font-semibold text-xl mb-3">Data Protection</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Industry-standard security measures to protect your data</li>
          <li>Encryption of sensitive information</li>
          <li>Regular security audits and updates</li>
          <li>Strict access controls for employee data access</li>
        </ul>
      </section>
      
      <section>
        <h3 className="font-semibold text-xl mb-3">Your Rights</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Access your personal data</li>
          <li>Request data correction or deletion</li>
          <li>Withdraw consent at any time</li>
          <li>Data portability rights</li>
        </ul>
      </section>
    </div>
  </div>
);

export default Privacy;
