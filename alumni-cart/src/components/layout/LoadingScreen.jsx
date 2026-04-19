import React from "react";

const LoadingScreen = () => {
  return (
    <>
      <style>{`
        .portal-loader-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .portal-loader {
          --w: 180px;
          --h: 42px;
          position: relative;
          width: var(--w);
          height: var(--h);
          overflow: hidden;
          border: 4px solid #000;
          background: #ffffff;
          box-shadow: 8px 8px 0 #000;
        }

        .portal-loader-track {
          position: absolute;
          inset: 0;
          display: flex;
          width: max-content;
          animation: portal-slide 1.1s linear infinite;
        }

        .portal-loader-segment {
          width: 60px;
          height: 100%;
          border-right: 4px solid #000;
          transform: skewX(-22deg);
          transform-origin: center;
        }

        .portal-loader-segment:nth-child(1) { background: #93c5fd; }
        .portal-loader-segment:nth-child(2) { background: #60a5fa; }
        .portal-loader-segment:nth-child(3) { background: #3b82f6; }
        .portal-loader-segment:nth-child(4) { background: #93c5fd; }
        .portal-loader-segment:nth-child(5) { background: #60a5fa; }
        .portal-loader-segment:nth-child(6) { background: #3b82f6; }

        @keyframes portal-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-64px);
          }
        }

        .portal-loader-card {
          animation: portal-pop 300ms ease-out;
        }

        @keyframes portal-pop {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div className="fixed inset-0 z-[100] bg-blue-50 flex items-center justify-center font-mono px-6">
        <div className="portal-loader-card bg-white border-4 border-black px-10 py-8 shadow-[12px_12px_0px_#000] text-center">
          <div className="portal-loader-wrap mb-6">
            <div className="portal-loader">
              <div className="portal-loader-track">
                <div className="portal-loader-segment" />
                <div className="portal-loader-segment" />
                <div className="portal-loader-segment" />
                <div className="portal-loader-segment" />
                <div className="portal-loader-segment" />
                <div className="portal-loader-segment" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black">ALUMNI CART</h1>
          <p className="mt-3 text-sm font-bold tracking-wide">
            LOADING.........
          </p>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;