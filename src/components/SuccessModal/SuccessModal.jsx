import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";

const SuccessModal = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // تشغيل القصاصات فقط لما المودال يفتح والـ Canvas تكون اتعمل لها render
    if (isOpen && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        scalar: 0.8,
      });

      return () => {
        myConfetti.reset();
      };
    }
  }, [isOpen]);

  // لو المودال مقفول مش هنعرض أي حاجة في الـ DOM
  if (!isOpen) return null;

  return (
    // الخلفية المعتمة للمودال (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* الكارد نفسه */}
      <div className="relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-center">
        {/* الـ Canvas الخاصة بالتأثير */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* محتوى المودال */}
        <div className="relative z-20">
          <div className="text-white bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={40} strokeWidth={2} />
          </div>
          {/* <span className="text-4xl block mb-2">🎉</span> */}
          <h3 className="text-xl font-bold text-gray-800">
            Your order is confirmed
          </h3>
          <p className="text-gray-600 text-sm mt-1 mb-6">
            Thank you for shopping with us.
          </p>

          {/* زرار الـ OK */}
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-burgundy btn text-white font-medium rounded-xl transition duration-200"
          >
             Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
