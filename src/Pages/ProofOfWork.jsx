import { motion } from "framer-motion";
import TitleCard from "../components/TitleCard";

const ProofOfWork = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="w-full px-6 mt-20"
  >
    <h2 className="text-4xl font-bold text-center text-black dark:text-white mb-10">
      Proof&nbsp;of&nbsp;Work
    </h2>

    <TitleCard />

    <div className="text-center mt-12">
      <p className="text-gray-700 dark:text-gray-300 text-lg ">
    
      </p>
    </div>
  </motion.section>
);

export default ProofOfWork;
