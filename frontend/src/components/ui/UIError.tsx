export default function ErrorUI(props:object) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24" {...props}>{/* Icon from Guidance by Streamline - https://creativecommons.org/licenses/by/4.0/ */}
      <path
        fill="none"
        stroke="currentColor"
        d="M12 8.465L18.965 1.5l.177.177l.152.228a10.1 10.1 0 0 0 2.8 2.801l.23.153l.176.177L15.536 12l6.964 6.965l-.177.176l-.228.153a10.1 10.1 0 0 0-2.801 2.8l-.153.23l-.176.176L12 15.536L5.036 22.5l-.177-.177l-.153-.228a10.1 10.1 0 0 0-2.8-2.801l-.23-.153l-.176-.176L8.465 12L1.5 5.036l.177-.177l.229-.153a10.1 10.1 0 0 0 2.8-2.8l.153-.23l.177-.176z"
        style={{
          animation: 'checkmark-draw 1.5s ease-in-out',
          transformOrigin: 'center'
        }}
      />

      <style>{`
        @keyframes checkmark-draw {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </svg>
  )
}
