import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import { convertProductToCartItem, getError } from "../utils";
import Rating from "../components/Rating";
import { Store } from "../Store";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn("Desculpe, não há estoque para este produto.");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("O produto foi adicionado ao carrinho.");
    navigate("/cart");
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div className="flex justify-center items-center w-screen">
      <Helmet>
        <title>{product.name} | Brechola</title>
      </Helmet>
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 ">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto mt-10"
          ></img>
        </div>
        <div className="sm:flex flex-col justify-start mt-10">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="sm:flex mt-5">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <div className="text-lg font-semibold mt-5">
            Preço: ${product.price}
          </div>
          <div className="mt-8">
            Description: <p>{product.description}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between mt-5">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-lg font-semibold mb-2">
              Preço: ${product.price}
            </div>
            <div>
              {product.countInStock > 0 ? (
                <div className="text-blue-500 ml-[1px] rounded-lg font-semibold mt-3 inline-block">
                  Disponível
                </div>
              ) : (
                <div
                  className="
                bg-gray-200 border-l-2 py-2 px-4 rounded-lg text-gray-700 font-semibold cursor-not-allowed mt-3 inline-block"
                >
                  Indisponível
                </div>
              )}
            </div>
            <div>
              {product.countInStock > 0 && (
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold mt-3"
                    onClick={addToCartHandler}
                  >
                    Adicione ao carrinho
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
