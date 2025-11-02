import React from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  children: React.ReactNode;
}

const FadeInOnScroll: React.FC<Props> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
