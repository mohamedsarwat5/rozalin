import React from "react";

export default function Exchange() {
  const data = [
    "1.Full Preview Before Acceptance Customers may fully inspect and measure the product in the presence of the delivery agent before completing the receipt.",
    "2.Check All Details You can check the shape, size, and material, and confirm the product matches the required specifications while the agent is present.",
    "3.Immediate Return Option If the product doesn't match or isn't satisfactory, it can be rejected and returned on the spot, with the customer covering the full delivery fee.",
    "4.No Returns or Exchanges After Departure Once the order is received and the delivery agent has left, no returns or exchanges are accepted for any reason.",
  ];
  return (
    <div className="padding md:h-dvh">
      <h2 className="font-bold mb-3 md:text-xl text-lg">Preview & Exchange Policy:</h2>
      <div className="flex flex-col space-y-6 max-w-4xl ">
        {data.map((item, i) => (
          <h4 className="" key={i}>{item}</h4>
        ))}
      </div>
    </div>
  );
}
