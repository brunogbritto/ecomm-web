export default function CheckoutSteps(props: {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}) {
  const { step1, step2, step3, step4 } = props;

  return (
    <div className="flex items-center justify-center mt-8 space-x-4">
      {/* Passo 1 */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full ${
            step1 ? "bg-green-500" : "bg-gray-300"
          } flex items-center justify-center text-white font-semibold`}
        >
          1
        </div>
        <p className={`mt-2 ${step1 ? "text-green-500" : "text-gray-500"}`}>
          Logged in
        </p>
      </div>

      {/* Passo 2 */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full ${
            step2 ? "bg-green-500" : "bg-gray-300"
          } flex items-center justify-center text-white font-semibold`}
        >
          2
        </div>
        <p className={`mt-2 ${step2 ? "text-green-500" : "text-gray-500"}`}>
          Shipping
        </p>
      </div>

      {/* Passo 3 */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full ${
            step3 ? "bg-green-500" : "bg-gray-300"
          } flex items-center justify-center text-white font-semibold`}
        >
          3
        </div>
        <p className={`mt-2 ${step3 ? "text-green-500" : "text-gray-500"}`}>
          Payment
        </p>
      </div>

      {/* Passo 4 */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full ${
            step4 ? "bg-green-500" : "bg-gray-300"
          } flex items-center justify-center text-white font-semibold`}
        >
          4
        </div>
        <p className={`mt-2 ${step4 ? "text-green-500" : "text-gray-500"}`}>
          Place Order
        </p>
      </div>
    </div>
  );
}
