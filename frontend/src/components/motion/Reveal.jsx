import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];

// Gentle fade + rise on scroll into view. Respects prefers-reduced-motion.
export function Reveal({ children, delay = 0, y = 22, className, as = "div", once = true, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

// Signature on-load hero moment: masked, line-by-line rise reveal.
export function MaskedLines({ lines, className, lineClassName, start = 0.05, stagger = 0.12 }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={"block " + (lineClassName || "")}
            initial={reduce ? false : { y: "110%" }}
            animate={reduce ? {} : { y: "0%" }}
            transition={{ duration: 0.85, delay: start + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeIn({ children, delay = 0, className, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      animate={reduce ? {} : { opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
