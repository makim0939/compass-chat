import * as React from "react";
import { SVGProps } from "react";
const AddButtonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    scale={0.1}
    width={128}
    height={128}
    fill="red"
    {...props}
  >
    <rect width={58} height={7} x={35} y={61} fill="#D9D9D9" rx={3.5} />
    <rect
      width={60}
      height={7}
      x={61}
      y={94}
      fill="#D9D9D9"
      rx={3.5}
      transform="rotate(-90 61 94)"
    />
  </svg>
);
export default AddButtonIcon;
