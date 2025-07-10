import { forwardRef, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Animation loop hook
function useAnimationFrame(callback) {
  useEffect(() => {
    let frameId;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

// Tracks mouse/touch relative to container
function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (e) => updatePosition(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 60,
    falloff = "linear", // "linear" | "exponential" | "gaussian"
    className = "",
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });

  // Parse and cache font-variation settings
  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) =>
      new Map(
        settingsStr
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ");
            return [name.replace(/['"]/g, ""), parseFloat(value)];
          })
      );

    const from = parseSettings(fromFontVariationSettings);
    const to = parseSettings(toFontVariationSettings);

    return Array.from(from.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: to.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  // Distance and falloff
  const calculateDistance = (x1, y1, x2, y2) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case "exponential":
        return norm ** 2;
      case "gaussian":
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case "linear":
      default:
        return norm;
    }
  };

  // Animation loop — update all letter styles
  useAnimationFrame(() => {
    const { x, y } = mousePositionRef.current;
    if (
      lastPositionRef.current.x === x &&
      lastPositionRef.current.y === y
    ) return;

    lastPositionRef.current = { x, y };

    const containerRect = containerRef?.current?.getBoundingClientRect();
    if (!containerRect) return;

    letterRefs.current.forEach((ref, idx) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - containerRect.left;
      const centerY = rect.top + rect.height / 2 - containerRect.top;

      const dist = calculateDistance(x, y, centerX, centerY);

      if (dist >= radius) {
        ref.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(dist);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolated = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolated}`;
        })
        .join(", ");

      interpolatedSettingsRef.current[idx] = newSettings;
      ref.style.fontVariationSettings = newSettings;
    });
  });

  // Render words & letters
  const words = label.split(" ");
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      onClick={onClick}
      className={className}
      style={{
        display: "inline",
        fontFamily: "'Roboto Flex', sans-serif",
        ...style,
      }}
      {...restProps}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((letter) => {
            const currentIdx = letterIndex++;
            return (
              <motion.span
                key={currentIdx}
                ref={(el) => (letterRefs.current[currentIdx] = el)}
                style={{
                  display: "inline-block",
                  fontVariationSettings:
                    interpolatedSettingsRef.current[currentIdx],
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {/* add space between words */}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      {/* hidden text for screen readers */}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
