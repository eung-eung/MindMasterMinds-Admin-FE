import Image from "next/image";
import { Metadata } from "next";
import DashBoardPage from "./components/DashboardPage/page";
export const metadata: Metadata = {
  title: 'MindMasterMinds'
}
export default function Home() {
  return (
    <DashBoardPage />
  );
}
