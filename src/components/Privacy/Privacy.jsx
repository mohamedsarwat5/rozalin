import React from 'react';

export default function Privacy() {
    const highlights = [
    {
      id: "01",
      title: "Data Collection Upon Purchase Only",
      desc: "You remain completely anonymous while browsing our website. We only collect your basic details—such as your name, address and phone number,when you place an order so we can successfully deliver your items."
    },
    {
      id: "02",
      title: "Data Shared for Shipping Only",
      desc: "We only share your name and address with our shipping partners and couriers to deliver your packages. We are strictly committed to never selling, sharing, or leaking your data to any third party outside this process."
    },
    {
      id: "03",
      title: "Cookies for Seamless Shopping",
      desc: "We use cookies to remember your shopping cart items and make browsing easier. We also use Google Analytics to understand website traffic and improve your shopping experience, entirely anonymously."
    },
    {
      id: "04",
      title: "Secure & Encrypted Payments",
      desc: "We implement secure encryption (SSL) to protect your financial data. For your own safety, we strongly advise you not to send full credit or debit card details through unencrypted everyday communication channels."
    },
    {
      id: "05",
      title: "Your Full Rights as a Customer",
      desc: "You have the right to modify your personal details for free or opt out of promotional at any time. We commit to processing your request within a maximum of 7 business days."
    }
  ];
  return (
    <div>
        <div className='padding min-h-dvh'>
     <div className="max-w-3xl mx-auto  rounded-2xl p-2 sm:p-10">

        {/* Header */}
        <header className="border-b border-gray-100 pb-6 mb-8 text-left">
          <span className="text-xs font-semibold tracking-widest text-burgundy uppercase">Rozalin Store</span>
          <h1 className="text-2xl sm:text-3xl  font-bold text-gray-950 mt-2">
            Privacy Policy:
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            The 5 key points ensuring a secure and transparent shopping experience with us.
          </p>
        </header>

        {/* Highlights List */}
        <div className="space-y-6">
          {highlights.map((item) => (
            <div key={item.id} className="flex gap-4 p-1 rounded-xl hover:bg-gray-50/50 transition-colors duration-200">
              {/* Number Badge */}
              <div className="shrink-0">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-burgundy font-semibold text-base">
                  {item.id}
                </span>
              </div>
              {/* Text Content */}
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-950">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
        </div>
    </div>
  );
}