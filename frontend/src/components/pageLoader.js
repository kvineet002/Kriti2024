import React from "react";

const distance = [1, 3, 5];

const cssUnit = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true,
};

function parseLengthAndUnit(size) {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px",
    };
  }

  let value;
  const valueString = (size.match(/^[0-9.]*/) || "")[0];

  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }

  const unit = (size.match(/[^0-9]*$/) || "")[0];

  if (cssUnit[unit]) {
    return {
      value: value,
      unit: unit,
    };
  }

  console.warn(
    `React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`
  );

  return {
    value: value,
    unit: "px",
  };
}
const createAnimation = (loaderName, frames, suffix) => {
  const animationName = `react-spinners-${loaderName}-${suffix}`;

  if (typeof window === "undefined" || !window.document) {
    return animationName;
  }

  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;

  const keyFrames = `
    @keyframes ${animationName} {
      ${frames}
    }
  `;

  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }

  return animationName;
};

const propagate = [
  createAnimation(
    "PropagateLoader",
    `25% {transform: translateX(-${distance[0]}rem) scale(0.75)}
    50% {transform: translateX(-${distance[1]}rem) scale(0.6)}
    75% {transform: translateX(-${distance[2]}rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`,
    "propogate-0"
  ),
  createAnimation(
    "PropagateLoader",
    `25% {transform: translateX(-${distance[0]}rem) scale(0.75)}
    50% {transform: translateX(-${distance[1]}rem) scale(0.6)}
    75% {transform: translateX(-${distance[1]}rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`,
    "propogate-1"
  ),
  createAnimation(
    "PropagateLoader",
    `25% {transform: translateX(-${distance[0]}rem) scale(0.75)}
    75% {transform: translateX(-${distance[0]}rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`,
    "propogate-2"
  ),
  createAnimation(
    "PropagateLoader",
    `25% {transform: translateX(${distance[0]}rem) scale(0.75)}
    75% {transform: translateX(${distance[0]}rem) scale(0.75)}
    95% {transform: translateX(0rem) scale(1)}`,
    "propogate-3"
  ),
  createAnimation(
    "PropagateLoader",
    `25% {transform: translateX(${distance[0]}rem) scale(0.75)}
    50% {transform: translateX(${distance[1]}rem) scale(0.6)}
    75% {transform: translateX(${distance[1]}rem) scale(0.6)}
    95% {transform: translateX(0rem) scale(1)}`,
    "propogate-4"
  ),
  createAnimation(
    "PropagateLoader",
    `25% {transform: translateX(${distance[0]}rem) scale(0.75)}
    50% {transform: translateX(${distance[1]}rem) scale(0.6)}
    75% {transform: translateX(${distance[2]}rem) scale(0.5)}
    95% {transform: translateX(0rem) scale(1)}`,
    "propogate-5"
  ),
];

function PropagateLoader({
  loading = true,
  color = "#fff",
  speedMultiplier = 1,
  cssOverride = {},
  size = 15,
  ...additionalprops
}) {
  const { value, unit } = parseLengthAndUnit(size);

  const wrapper = {
    display: "inherit",
    position: "relative",
    ...cssOverride,
  };

  const style = (i) => {
    return {
      position: "absolute",
      fontSize: `${value / 3}${unit}`,
      width: `${value}${unit}`,
      height: `${value}${unit}`,
      background: color,
      borderRadius: "50%",
      animation: `${propagate[i]} ${1.5 / speedMultiplier}s infinite`,
      animationFillMode: "forwards",
    };
  };

  return (
    <span style={wrapper} {...additionalprops}>
      <span style={style(0)} />
      <span style={style(1)} />
      <span style={style(2)} />
      <span style={style(3)} />
      <span style={style(4)} />
      <span style={style(5)} />
    </span>
  );
}

function PageLoader() {
  return (
    <div className=" h-screen w-screen text-3xl bg-black gap-1 text-white flex flex-col justify-center items-center">
      <PropagateLoader />
      <span className=" translate-y-4 translate-x-2 tracking-tight uppercase font-semibold text-2xl  text-white cursor-pointer">
        Collampus
      </span>
    </div>
  );
}
export default PageLoader;
