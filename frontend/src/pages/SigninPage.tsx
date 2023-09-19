import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useSigninMutation } from "../hooks/userHook";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signin, isLoading } = useSigninMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await signin({
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="flex flex-col items-center justify-center h-full pt-[200px] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
            placeholder="Seu e-mail"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
            placeholder="Sua senha"
          />
        </div>
        <button className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300">
          Entrar
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Novo por aqui?{" "}
          <Link to={`/signup?redirect=${redirect}`} className="text-blue-600">
            Crie uma conta agora
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
