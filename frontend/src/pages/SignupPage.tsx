import { useContext, useEffect, useState } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useSignupMutation } from "../hooks/userHook";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function SignupPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { mutateAsync: signup, isLoading } = useSignupMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const data = await signup({
        name,
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
  return (
    <div className="flex flex-col items-center justify-center h-full pt-[200px] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6">Crie sua conta</h2>
        <Form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Nome
            </label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Nome"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              E-mail
            </label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="E-mail"
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
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Senha"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-600"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Confirmar Senha"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300"
          >
            Criar Conta
          </button>
        </Form>
        <p className="mt-4 text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link to={`/signin?redirect=$`} className="text-blue-600">
            Faça login
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
