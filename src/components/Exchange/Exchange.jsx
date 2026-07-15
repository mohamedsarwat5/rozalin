import React from "react";

export default function Exchange() {
  const deliveryPolicy = [
    {
      id: 1,
      numEn: "1",
      numAr: "١",
      en: "Full Preview Before Acceptance: Customers may fully inspect and measure the product in the presence of the delivery agent before completing the receipt.",
      ar: "معاينة كاملة قبل الاستلام: يحق للعميل فحص المنتج وقياسه بالكامل في وجود مندوب التوصيل قبل إتمام الاستلام.",
    },
    {
      id: 2,
      numEn: "2",
      numAr: "٢",
      en: "Check All Details: You can check the shape, size, and material, and confirm the product matches the required specifications while the agent is present.",
      ar: "التحقق من كافة التفاصيل: يمكنك التأكد من الشكل، والمقاس، والخامة، ومطابقة المنتج للمواصفات المطلوبة أثناء تواجد المندوب.",
    },
    {
      id: 3,
      numEn: "3",
      numAr: "٣",
      en: "Immediate Return Option: If the product doesn't match or isn't satisfactory, it can be rejected and returned on the spot, with the customer covering the full delivery fee.",
      ar: "خيار الإرجاع الفوري: إذا لم يكن المنتج مطابقاً أو مرضياً، يمكن رفضه وإعادته في الحال، مع تحمل العميل لمصاريف الشحن كاملة.",
    },
    {
      id: 4,
      numEn: "4",
      numAr: "٤",
      en: "No Returns or Exchanges After Departure: Once the order is received and the delivery agent has left, no returns or exchanges are accepted for any reason.",
      ar: "لا مرتجعات أو استبدال بعد المغادرة: بمجرد استلام الطلب ومغادرة مندوب التوصيل، لا يتم قبول أي مرتجعات أو استبدال لأي سبب كان.",
    },
  ];

  return (
    <div className="padding md:h-dvh">
      <h2 className="font-bold mb-3 md:text-xl text-lg">
        Preview & Exchange Policy:
      </h2>
      <div className="flex flex-col space-y-6 max-w-4xl ">
        {deliveryPolicy.map((item, i) => (
          <h4 className="" key={i} lang="auto">
            {item.id}.{item.en}
          </h4>
        ))}
      </div>
      <h2 className="font-bold my-3 md:text-xl text-lg text-right">
        :سياسة المعاينة والاستبدال
      </h2>
      <div className="w-full pb-4 mt-3.5 space-y-3" dir="rtl">
        {deliveryPolicy.map((item, i) => (
          <h4 className="text-right  text-gray-800" key={i}>
            <span className="ml-1">{item.numAr}.</span>
            <span>{item.ar}</span>
          </h4>
        ))}
      </div>
    </div>
  );
}
