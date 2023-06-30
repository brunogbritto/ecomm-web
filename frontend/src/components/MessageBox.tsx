import { ReactNode, useEffect, useState } from "react";

type MessageBoxProps = {
  variant: "success" | "danger" | "warning" | "info";
  children: ReactNode;
};

const MessageBox = ({ variant, children }: MessageBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  let classes = "px-4 py-2 rounded opacity-0 transition-opacity duration-500";

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
    classes += " animate-fade-in opacity-100";
  }

  return <div className={classes}>{children}</div>;
};

export default MessageBox;
