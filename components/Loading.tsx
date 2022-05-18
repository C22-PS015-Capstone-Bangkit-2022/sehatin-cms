import React from "react";

function LoadingScreen() {
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
      <div className="absolute z-50 w-full h-full overflow-hidden flex justify-center items-center">
        <div className="h-14 w-14 animate-pulse bg-green-300 rounded-full flex justify-center items-center">
          <svg
            className="w-12 h-12 text-green-500 animate-spin"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/*<path*/}
            {/*  stroke-linecap="round"*/}
            {/*  stroke-linejoin="round"*/}
            {/*  stroke-width="2"*/}
            {/*  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"*/}
            {/*></path>*/}
            {/*<path*/}
            {/*  stroke-linecap="round"*/}
            {/*  stroke-linejoin="round"*/}
            {/*  stroke-width="2"*/}
            {/*  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"*/}
            {/*></path>*/}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
