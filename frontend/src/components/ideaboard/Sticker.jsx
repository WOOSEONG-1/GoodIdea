import { useEffect, useState } from "react";

const Sticker = ({ delay, x, y, color, darkColor }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // delay 시간 후에 애니메이션 활성화
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute w-72 h-72 ${
        animate ? "animate-tinDownIn" : "opacity-0"
      }`}
      style={{
        left: x,
        top: y,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* 상단 메모 부분 */}
      <div
        className="w-72 h-60 rounded-tr-[30px] rounded-tl-[30px]"
        style={{ backgroundColor: color }}
      >
        <div className="p-4">
          <p className="text-gray-700">메모 내용을 입력하세요...</p>
        </div>
      </div>

      {/* 하단 바 부분 */}
      <div
        className="left-0 w-60 h-12 ml-auto mr-0"
        style={{ backgroundColor: color }}
      ></div>

      {/* 왼쪽 하단 접힌 부분 */}
      <div
        className="absolute bottom-0 left-0 w-12 h-12"
        style={{
          backgroundColor: darkColor,
          clipPath: "polygon(100% 100%, 100% 0, 0 0)", // 삼각형 모양
        }}
      ></div>
    </div>
  );
};

export default Sticker;
