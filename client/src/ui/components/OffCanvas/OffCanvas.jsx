import { motion, AnimatePresence } from "framer-motion";
import styles from "./Offcanvas.module.css";
import { useState } from "react";

export const OffCanvas = ({btnName,btnStyle,title,children,offcanvasId}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen);
  };

  const closeOffCanvas = () => {
    setIsOpen(false);
  };
  const variants = {
    open: {
      x: "0%", // Muestra el panel completamente en la pantalla
      transition: { ease: "easeOut", duration: 0.3 },
    },
    closed: {
      x: "100%", // Esconde el panel completamente fuera de la pantalla a la derecha
      transition: { ease: "easeOut", duration: 0.3 },
    },
  };

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: "auto" },
    closed: { opacity: 0, pointerEvents: "none" },
  };

  return (
    <>
      <button className={`btn ${btnStyle}`} onClick={toggleOffCanvas}>{btnName}</button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles["offcanvas-overlay"]}
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={closeOffCanvas}
          >
            <motion.div className={styles.offcanvas} variants={variants}>
              <div className={styles.container_}>
                <div className={styles.header}>
                  <span className={styles.title}>{title}</span>
                  <button
                    onClick={closeOffCanvas}
                    className={styles["close-button"]}
                  >
                    X
                  </button>
                </div>
                <div className={styles.body_}>
                  {children}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
