import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Store } from "../Store";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../hooks/orderHooks";
import { ApiError } from "../types/ApiError";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!);

  const { mutateAsync: payOrder, isLoading: loadingPay } =
    usePayOrderMutation();

  const testPayHandler = async () => {
    await payOrder({ orderId: orderId! });
    refetch();
    toast.success("Order is paid");
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  const { data: paypalConfig } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { clientId: paypalConfig!.clientId, currency: "BRL" },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPaypalScript();
    }
  }, [paypalConfig]);

  const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        .then((orderId: string) => {
          return orderId;
        });
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          await payOrder({ orderId: orderId!, ...details });
          refetch();
          toast.success("Order is paid successfully");
        } catch (err) {
          toast.error(getError(err as ApiError));
        }
      });
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

  return isLoading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">Order Not Found</MessageBox>
  ) : (
    <div className="max-w-2xl mx-auto p-4">
      <Helmet>Order | Brechola</Helmet>
      <h1 className="text-2xl font-semibold mt-4 mr-[250px]">
        Order {orderId}
      </h1>
      <div className="flex mt-8">
        {/* Coluna da Esquerda */}
        <div className="w-[500px] pr-4">
          {/* Shipping Information */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Shipping Information</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <strong>Nome: </strong>
              {order.shippingAddress.fullName} <br />
              <strong>Endereço: </strong>
              {order.shippingAddress.address},{order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country} <br />
              <div>
                {order.isDelivered ? (
                  <div className="bg-green-300 border-l-2 py-2 px-4 rounded-lg text-gray-700 font-semibold cursor-not-allowed mt-3">
                    Objeto entregue em {order.deliveredAt}
                  </div>
                ) : (
                  <div className="bg-yellow-200 border-l-2 py-2 px-4 rounded-lg text-slate-700 font-semibold cursor-not-allowed mt-3">
                    Seu pedido está em andamento.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Payment Information</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <strong>Method:</strong> {order.paymentMethod}
              {order.isPaid ? (
                <div className="bg-green-300 border-l-2 py-2 px-4 rounded-lg text-gray-700 font-semibold cursor-not-allowed mt-3">
                  Objeto pago em {order.paidAt}
                </div>
              ) : (
                <div className="bg-yellow-200 border-l-2 py-2 px-4 rounded-lg text-slate-700 font-semibold cursor-not-allowed mt-3">
                  O pagamento não foi realizado.
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Ordered Items</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex mb-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mr-4 w-[75px] h-[95px]"
                  ></img>
                  <Link to={`/product/${item.slug}`}>{item.name}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="w-[250px]">
          {/* Order Summary */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="bg-white rounded-lg p-4 mt-4 flex">
              <ul className="list-none">
                <li className="flex justify-between items-center">
                  Preço itens:
                </li>
                <li className="flex justify-between items-center">Frete:</li>
                <li className="flex justify-between items-center">Taxa:</li>
                <li className="flex justify-between items-center mt-2">
                  <strong>Total: </strong>
                </li>
              </ul>
              <ul className="list-none">
                <li className="flex justify-between items-center ml-5">
                  $ {order.itemsPrice.toFixed(2)}
                </li>
                <li className="flex justify-between items-center ml-5">
                  $ {order.shippingPrice.toFixed(2)}
                </li>
                <li className="flex justify-between items-center ml-5">
                  $ {order.taxPrice.toFixed(2)}
                </li>
                <li className="flex justify-between items-center ml-5 mt-2">
                  <strong>$ {order.totalPrice.toFixed(2)}</strong>
                </li>
              </ul>
            </div>
            {!order.isPaid && (
              <div className="mt-2 pb-5 shadow-md">
                {isPending ? (
                  <LoadingBox />
                ) : isRejected ? (
                  <div className="bg-yellow-200 border-l-2 py-2 px-4 rounded-lg text-slate-700 font-semibold cursor-not-allowed mt-3">
                    Erro ao se conectar com o Paypal.
                  </div>
                ) : (
                  <div>
                    <PayPalButtons
                      {...paypalButtonTransactionProps}
                    ></PayPalButtons>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                      onClick={testPayHandler}
                    >
                      {" "}
                      Test Pay
                    </button>
                  </div>
                )}
              </div>
            )}
            {isLoading && <LoadingBox></LoadingBox>}
          </div>
        </div>
      </div>
    </div>
  );
}
