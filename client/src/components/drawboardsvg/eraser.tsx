export function eraser() {
  return (
    <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
      {/* Eraser body (a slanted rectangle) */}
      <polygon
        points="5,15 15,5 20,10 10,20"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />

      {/* Eraser bottom part (flat edge) */}
      <line x1="10" y1="20" x2="20" y2="10" stroke="white" strokeWidth="1" />
    </svg>
  );
}
