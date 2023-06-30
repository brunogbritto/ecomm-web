import { Link } from "react-router-dom";
import { sampleProducts } from "../data";
import { Product } from "../types/Product";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Product[] }
  | { type: "FETCH_FAIL"; payload: string };

const initialState: State = {
  products: [],
  loading: true,
  error: "",
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err as ApiError) });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ul className="md:flex flex-row gap-4 ">
          {sampleProducts.map((product) => (
            <li className="flex flex-col" key={product.slug}>
              <div className="max-w-[400px] w-full mt-7">
                <Link to={"/product/" + product.slug}>
                  <img src={product.image} alt={product.name} />
                  <h1 className="font-bold mt-2 text-xl">{product.name}</h1>
                  <p>${product.price}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
