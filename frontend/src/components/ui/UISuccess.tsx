export default function SuccessUI(props: object) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="2em" 
      height="2em" 
      viewBox="0 0 20 20" 
      {...props}
    >
      {/* Icon from Zondicons by Steve Schoger - https://github.com/dukestreetstudio/zondicons/blob/master/LICENSE */}
      <path 
        fill="currentColor" 
        d="m0 11l2-2l5 5L18 3l2 2L7 18z"
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
  );
}
