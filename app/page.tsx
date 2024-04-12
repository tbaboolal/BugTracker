import Image from "next/image";
import SigninButton from "@/components/SignInButton";

const getTickets = async () => {
  try{
    const res = await fetch ("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    return res.json();
  }
  catch (error) {
    console.log(error)
  }
};
export default async function Home() {
  const data = await getTickets();
  console.log(data)
  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#ffd6eb' }}>
      <div className="text-center">
        <div className="flex items-center space-x-4 mb-8">
          <img src="/roach.gif" className="h-12 w-12" />
          <h1 className="font-comic font-bold text-5xl">Bug Tracker</h1>
        </div>
        <SigninButton/>
      </div>
    </div>
  );
}
