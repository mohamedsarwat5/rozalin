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
          {/* <div className="text-white bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ">
            <Check size={40} strokeWidth={2} />
          </div> */}

          <div className="h-32 w-32 mx-auto mb-4">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              height="100%"
              width="100%"
              viewBox="0 0 500 500"
            >
              <defs>
                <filter id="i0">
                  <feColorMatrix
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                    type="matrix"
                  />
                </filter>
                <mask
                  height={20000}
                  width={20000}
                  y={-10000}
                  x={-10000}
                  maskContentUnits="userSpaceOnUse"
                  maskUnits="userSpaceOnUse"
                  style={{ maskType: "alpha" }}
                  mask-type="alpha"
                  id="i1"
                >
                  <g transform="matrix(0.306,0,0,0.306,-72.477,-76.453)">
                    <g
                      filter="url(#i0)"
                      transform="matrix(3.27,0,0,3.27,237,250)"
                    >
                      <g id="i2">
                        <g transform="translate(3.716,0)">
                          <g transform="scale(0,0)">
                            <animateTransform
                              repeatCount="indefinite"
                              type="scale"
                              attributeName="transform"
                              dur="2.503s"
                              begin="0s"
                              calcMode="spline"
                              values="0 0; 0 0; 1 1; 1 1; 0 0; 0 0"
                              keyTimes="0; 0.293333; 0.4; 0.853333; 0.986666; 1"
                              keySplines="0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1"
                              fill="freeze"
                            />
                            <g transform="translate(0,0)">
                              <g transform="matrix(1,0,0,1,0,0)" id="i3">
                                <g id="i4">
                                  <path
                                    fill="#41ef98"
                                    d="M65.513,0C65.513,36.182,36.182,65.513,0,65.513C-36.182,65.513,-65.513,36.182,-65.513,0C-65.513,-36.182,-36.182,-65.513,0,-65.513C36.182,-65.513,65.513,-36.182,65.513,0Z"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </mask>
              </defs>
              <g transform="matrix(3.27,0,0,3.27,237,250)" id="i5">
                <g visibility="visible" id="i6">
                  <animate
                    repeatCount="indefinite"
                    begin="0s"
                    calcMode="discrete"
                    dur="2.503s"
                    values="visible; hidden; hidden"
                    keyTimes="0; 0.827164; 1"
                    attributeName="visibility"
                  />
                  <g transform="translate(6.493,0)">
                    <g transform="rotate(0)">
                      <animateTransform
                        repeatCount="indefinite"
                        type="rotate"
                        attributeName="transform"
                        dur="2.503s"
                        begin="0s"
                        calcMode="spline"
                        values="0; 360; 360"
                        keyTimes="0; 0.213333; 1"
                        keySplines="0.502 0 0.495 1; 0 0 1 1"
                        fill="freeze"
                      />
                      <g transform="scale(0,0)">
                        <animateTransform
                          repeatCount="indefinite"
                          type="scale"
                          attributeName="transform"
                          dur="2.503s"
                          begin="0s"
                          calcMode="spline"
                          values="0 0; 1 1; 1 1"
                          keyTimes="0; 0.213333; 1"
                          keySplines="0 0 1 1; 0 0 1 1"
                          fill="freeze"
                        />
                        <g transform="translate(0,0)">
                          <g id="i7">
                            <path
                              fill="#41ef98"
                              d="M-38.761,-2.143C-38.761,-2.143,-29.473,-11.432,-29.473,-11.432C-29.473,-11.432,-7.929,10.112,-7.929,10.112C-7.929,10.112,30.188,-28.223,30.188,-28.223C30.188,-28.223,38.761,-18.934,38.761,-18.934C38.761,-18.934,-8.038,28.223,-8.038,28.223C-8.038,28.223,-38.761,-2.143,-38.761,-2.143Z"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="matrix(3.27,0,0,3.27,237,250)" id="i5">
                <g visibility="hidden" id="i8">
                  <animate
                    repeatCount="indefinite"
                    begin="0s"
                    calcMode="discrete"
                    dur="2.503s"
                    values="hidden; visible; visible"
                    keyTimes="0; 0.067013; 1"
                    attributeName="visibility"
                  />
                  <g transform="translate(0,0)">
                    <g transform="rotate(0)">
                      <animateTransform
                        repeatCount="indefinite"
                        type="rotate"
                        attributeName="transform"
                        dur="2.503s"
                        begin="0s"
                        calcMode="spline"
                        values="0; 0; 37.1; 37.1"
                        keyTimes="0; 0.066666; 0.493333; 1"
                        keySplines="0 0 1 1; 0 0 1 1; 0 0 1 1"
                        fill="freeze"
                      />
                      <g transform="scale(1,1) translate(0,0)">
                        <g id="i9" transform="matrix(1,0,0,0.93,0,0.009)">
                          <g id="i10" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="matrix(3.27,0,0,3.27,237,250)" id="i5">
                <g visibility="hidden" id="i2">
                  <animate
                    repeatCount="indefinite"
                    begin="0s"
                    calcMode="discrete"
                    dur="2.503s"
                    values="hidden; visible; visible"
                    keyTimes="0; 0.293058; 1"
                    attributeName="visibility"
                  />
                  <g transform="translate(3.716,0)">
                    <g transform="scale(0,0)">
                      <animateTransform
                        repeatCount="indefinite"
                        type="scale"
                        attributeName="transform"
                        dur="2.503s"
                        begin="0s"
                        calcMode="spline"
                        values="0 0; 0 0; 1 1; 1 1; 0 0; 0 0"
                        keyTimes="0; 0.293333; 0.4; 0.853333; 0.986666; 1"
                        keySplines="0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1"
                        fill="freeze"
                      />
                      <g transform="translate(0,0)">
                        <g id="i4">
                          <path
                            fill="#41ef98"
                            d="M65.513,0C65.513,36.182,36.182,65.513,0,65.513C-36.182,65.513,-65.513,36.182,-65.513,0C-65.513,-36.182,-36.182,-65.513,0,-65.513C36.182,-65.513,65.513,-36.182,65.513,0Z"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g
                mask="url(#i1)"
                transform="matrix(3.27,0,0,3.27,237,250)"
                id="i5"
              >
                <g id="i11">
                  <g transform="translate(6.493,0)">
                    <g transform="rotate(0)">
                      <animateTransform
                        repeatCount="indefinite"
                        type="rotate"
                        attributeName="transform"
                        dur="2.503s"
                        begin="0s"
                        calcMode="spline"
                        values="0; 360; 360"
                        keyTimes="0; 0.213333; 1"
                        keySplines="0.502 0 0.495 1; 0 0 1 1"
                        fill="freeze"
                      />
                      <g transform="scale(0,0)">
                        <animateTransform
                          repeatCount="indefinite"
                          type="scale"
                          attributeName="transform"
                          dur="2.503s"
                          begin="0s"
                          calcMode="spline"
                          values="0 0; 1 1; 1 1"
                          keyTimes="0; 0.213333; 1"
                          keySplines="0 0 1 1; 0 0 1 1"
                          fill="freeze"
                        />
                        <g transform="translate(0,0)">
                          <g id="i7">
                            <path
                              fill="#ffffff"
                              d="M-38.761,-2.143C-38.761,-2.143,-29.473,-11.432,-29.473,-11.432C-29.473,-11.432,-7.929,10.112,-7.929,10.112C-7.929,10.112,30.188,-28.223,30.188,-28.223C30.188,-28.223,38.761,-18.934,38.761,-18.934C38.761,-18.934,-8.038,28.223,-8.038,28.223C-8.038,28.223,-38.761,-2.143,-38.761,-2.143Z"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g
                display="none"
                transform="matrix(3.27,0,0,3.27,237,250)"
                id="i5"
              >
                <g id="i2">
                  <g transform="translate(3.716,0)">
                    <g transform="scale(0,0)">
                      <animateTransform
                        repeatCount="indefinite"
                        type="scale"
                        attributeName="transform"
                        dur="2.503s"
                        begin="0s"
                        calcMode="spline"
                        values="0 0; 0 0; 1 1; 1 1; 0 0; 0 0"
                        keyTimes="0; 0.293333; 0.4; 0.853333; 0.986666; 1"
                        keySplines="0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1"
                        fill="freeze"
                      />
                      <g transform="translate(0,0)">
                        <g transform="matrix(1,0,0,1,0,0)" id="i3">
                          <g id="i4">
                            <path
                              fill="#41ef98"
                              d="M65.513,0C65.513,36.182,36.182,65.513,0,65.513C-36.182,65.513,-65.513,36.182,-65.513,0C-65.513,-36.182,-36.182,-65.513,0,-65.513C36.182,-65.513,65.513,-36.182,65.513,0Z"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g
                transform="matrix(3.27,0,0,3.27,237,250)"
                opacity={0}
                id="i5"
              />
            </svg>
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
