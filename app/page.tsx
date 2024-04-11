import Image from "next/image";
import SigninButton from "@/components/SignInButton";


export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
         <img src="/roach.gif" className="h-12 w-12" />
         <h1 className="font-bold">Bug Tracker</h1>
      </div>
        <SigninButton/>
      </div>
    </div>
  );
}
