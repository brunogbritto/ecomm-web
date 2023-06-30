import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import Rating from "../components/Rating";

function ProductItem({ product }: { product: Product }) {
  return (
    <div>
      <Link to={`/product/${product.slug}`}>
        <img
          className="h-[450px] w-[350px]"
          src={product.image}
          alt={product.name}
        />
        <h1 className="font-bold mt-2 text-xl">{product.name}</h1>
        <p>${product.price}</p>
      </Link>
      <Rating rating={product.rating} numReviews={product.numReviews} />
      <div>
        {product.countInStock === 0 ? (
          <button className="bg-gray-200 border-l-2 py-2 px-4 rounded-lg text-gray-700 font-semibold cursor-not-allowed mt-3">
            Indisponível
          </button>
        ) : (
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold mt-3">
            Adicione ao carrinho
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
