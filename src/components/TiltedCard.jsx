import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const spring = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  imageSrc,
  altText = "",

  containerHeight = "100%",
  containerWidth  = "100%",
  
  imageHeight     = "100%",
  imageWidth      = "100%",
  rotateAmplitude = 14,
  scaleOnHover    = 1.2,
  showMobileWarning   = false,
  showTooltip          = false,
  overlayContent       = null,
  displayOverlayContent = false,
}) {
 
  const ref         = useRef(null);
  const x           = useMotionValue(0);
  const y           = useMotionValue(0);
  const rotateX     = useSpring(useMotionValue(0), spring);
  const rotateY     = useSpring(useMotionValue(0), spring);
  const scale       = useSpring(1, spring);
  const opacity     = useSpring(0);
  const rotateCap   = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  const [lastY, setLastY] = useState(0);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width  / 2;
    const offsetY = e.clientY - rect.top  - rect.height / 2;

    rotateX.set((-offsetY / (rect.height / 2)) * rotateAmplitude);
    rotateY.set(( offsetX / (rect.width  / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    rotateCap.set(-(offsetY - lastY) * 0.6);
    setLastY(offsetY);
  };

  return (
    <figure
      ref={ref}
      className="relative flex items-center justify-center [perspective:800px]"
      style={{ width: containerWidth, height: containerHeight }}
      onMouseMove={handleMouse}
      onMouseEnter={() => { scale.set(scaleOnHover); opacity.set(1); }}
      onMouseLeave={() => {
        scale.set(1); opacity.set(0);
        rotateX.set(0); rotateY.set(0); rotateCap.set(0);
      }}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-sm sm:hidden">
          Tilt effect best viewed on desktop
        </div>
      )}

      {/* 3‑D wrapper */}
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale, width: imageWidth, height: imageHeight }}
      >
        {/* LOGO / IMAGE */}
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute inset-0 object-contain rounded-[15px] p-1
                     will-change-transform [transform:translateZ(0)]"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Optional overlay */}
        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute inset-0 z-[2] [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 hidden sm:block bg-white rounded px-2 py-1 text-[10px] text-[#2d2d2d] opacity-0 z-[3]"
          style={{ x, y, opacity, rotate: rotateCap }}
        >
          {altText}
        </motion.figcaption>
      )}
    </figure>
  );
}
