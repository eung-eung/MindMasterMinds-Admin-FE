import Image from "next/image";
import { Metadata } from "next";
import Dashboard from "./(pages)/dashboard/page";
export const metadata: Metadata = {
  title: 'MindMasterMinds'
}
export default function Home() {
  return (
    <div >
    <Dashboard />
    </div>
    
  );
}
