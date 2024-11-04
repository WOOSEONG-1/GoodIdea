import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthAxiosInstance } from "../api/http-commons/authAxios";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const setLogin = useUserStore((state) => state.setLogin);

  useEffect(() => {
    const handleLogin = async () => {
      // URL에서 토큰 추출
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");
      const refreshToken = urlParams.get("refreshToken");
      if (accessToken && refreshToken) {
        // 토큰을 세션 스토리지에 저장
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        // 인증된 axios 인스턴스 생성
        createAuthAxiosInstance();
        try {
          // 프로필 정보 요청
          const profileResponse = await axios.get(
            `https://oracle1.mypjt.xyz/api/v1/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log("정보:", profileResponse.data.data);
          const userInfo = profileResponse.data.data;
          setLogin(userInfo); // userInfo 저장

          // 메인 페이지로 리디렉트
          navigate("/");
        } catch (error) {
          console.error("프로필 정보 가져오기 실패:", error);
        }
      } else {
        console.log("리디렉트된 URL에 토큰이 없습니다.");
      }
    };
    handleLogin();
  }, [navigate, setLogin]);

  return <>Login Page</>;
};

export default LoginPage;