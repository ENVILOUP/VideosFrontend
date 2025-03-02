import { LogIn } from "lucide-react";
import { Button } from "./ui/button";

export default function AuthButton() {
  return (
    <>
      <Button className="bg-blue-400 hover:bg-blue-500 transition-colors duration-300 cursor-pointer" size="sm" variant="outline">
        <LogIn />
        <span>Войти</span>
      </Button>
    </>
  );
}
