import dynamic from "next/dynamic";

const ContainerHome = dynamic(() => import("@/containers/container-home"));

export default function Home() {
  return <ContainerHome />;
}
