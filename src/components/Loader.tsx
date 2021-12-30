import { SVGProps } from 'react';

const Loader = (props: SVGProps<SVGSVGElement>) => (
  <svg aria-labelledby="loading" viewBox="0 0 480 80" {...props}>
    <title>{"Loading..."}</title>
    <rect
      width="100%"
      height="100%"
      clipPath="url(#a)"
      style={{
        fill: "url(#b)",
      }}
    />
    <defs>
      <linearGradient id="b">
        <stop offset="0%" stopColor="#f5f6f7">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="50%" stopColor="#eee">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stopColor="#f5f6f7">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
      <clipPath id="a">
        <rect y={10} width={410} height={6} rx={3} />
        <rect y={30} width={380} height={6} rx={3} />
        <rect y={50} width={178} height={6} rx={3} />
      </clipPath>
    </defs>
  </svg>
);

export default Loader;
