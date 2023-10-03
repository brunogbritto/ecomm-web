import { useNavigate } from "react-router-dom";
import { useGetOrderHistoryQuery } from "../hooks/orderHooks";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Helmet>Order | Brechola</Helmet>
      <h1 className="text-2xl font-semibold mt-4 mr-[250px]">Order History</h1>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <div className="bg-yellow-200 border-l-2 py-2 px-4 rounded-lg text-slate-700 font-semibold cursor-not-allowed mt-3">
          {getError(error as ApiError)}
        </div>
      ) : (
        <div className="mt-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">TOTAL</th>
                <th className="px-4 py-2">PAID</th>
                <th className="px-4 py-2">DELIVERED</th>
                <th className="px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders!.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="border px-4 py-2">
                    {order.totalPrice.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">
                    {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                  </td>
                  <td className="border px-4 py-2">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      {" "}
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}

              {/* Repita este bloco para cada linha da tabela */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
