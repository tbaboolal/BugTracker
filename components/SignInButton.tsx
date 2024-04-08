'use client'
import React, {useEffect} from "react";
import { signIn, signOut, useSession, UseSessionOptions } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

const SigninButton = () => {
    
    const { data: session } =  useSession();
    

    if(session && session.user){
        return(
            <div className="flex items-center gap-4 ml-auto">
                <p className="text-sky-600">Long time no see, {session.user.name}!</p>
                <Button variant="secondary" onClick={() => signOut()}>Sign Out</Button>
            </div>
            
        );
  
    }
    return (
        <Button onClick={() => signIn("trakt")}>
            <Mail className="mr-2 h-4 w-4" /> Please Login!
        </Button>
    );
};

export default SigninButton;