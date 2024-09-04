import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}
  
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </AnimatePresence>,
    document.getElementById('modal')
  );
}
