import { sampleProducts } from "../data";

import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <ul className="md:flex flex-row gap-4 ">
          <Helmet>
            <title>Brechola</title>
          </Helmet>
          {products!.map((product) => (
            <li className="flex flex-col" key={product.slug}>
              <div className="max-w-[400px] w-full mt-7">
                <ProductItem product={product} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
