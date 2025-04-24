
const Terms = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Terms of Service</h1>
    <p className="text-lg text-gray-700 mb-8">
      Please read these terms carefully before using GuideConnect.
    </p>
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto space-y-6">
      <section>
        <h3 className="font-semibold text-xl mb-3">User Responsibilities</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account</li>
          <li>Respect local laws and customs while using our services</li>
          <li>Communicate respectfully with other users</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-xl mb-3">Guide Responsibilities</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Maintain required licenses and certifications</li>
          <li>Provide accurate service descriptions</li>
          <li>Honor confirmed bookings</li>
          <li>Maintain professional conduct</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-xl mb-3">Booking and Cancellations</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Clear booking process and confirmation</li>
          <li>Fair cancellation policies</li>
          <li>Refund procedures</li>
          <li>Dispute resolution process</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-xl mb-3">Platform Rules</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>No fraudulent activity</li>
          <li>No harassment or discrimination</li>
          <li>Protection of intellectual property</li>
          <li>Right to suspend or terminate accounts</li>
        </ul>
      </section>
    </div>
  </div>
);

export default Terms;
