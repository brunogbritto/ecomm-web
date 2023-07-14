import { ReactNode, useEffect, useState } from "react";

type MessageBoxProps = {
  variant: "success" | "danger" | "warning" | "info";
  children: ReactNode;
};

const MessageBox = ({ variant, children }: MessageBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Defina o tempo de exibição do toast aqui (por exemplo, 3 segundos)

    return () => clearTimeout(timer);
  }, []);

  let classes =
    "px-4 py-2 rounded opacity-0 transition-opacity duration-500 fixed bottom-28 left-1/2 transform -translate-x-1/2";

  // Aplicar classes de acordo com a variante fornecida
  if (variant === "success") {
    classes += " bg-green-500 text-white";
  } else if (variant === "danger") {
    classes += " bg-red-500 text-white";
  } else if (variant === "warning") {
    classes += " bg-yellow-500 text-white";
  } else if (variant === "info") {
    classes += " bg-blue-500 text-white";
  } else {
    classes += " bg-gray-500 text-white";
  }

  if (isVisible) {
    classes += " opacity-100";
  }

  return <div className={classes}>{children}</div>;
};

export default MessageBox;
