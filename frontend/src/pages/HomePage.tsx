import { Link } from "react-router-dom";
import { sampleProducts } from "../data";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center">
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
    </div>
  );
}
