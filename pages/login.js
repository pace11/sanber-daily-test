import dynamic from "next/dynamic";

const ContainerLogin = dynamic(() => import("@/containers/container-login"));

export default function Login() {
  return <ContainerLogin />;
}
