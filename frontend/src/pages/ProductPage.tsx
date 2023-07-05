import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import Rating from "../components/Rating";

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div className="flex justify-center items-center w-screen">
      <Helmet>
        <title>{product.name}</title>
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
                <div className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold mt-3 inline-block">
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
          </div>
        </div>
      </div>
    </div>
  );
}
