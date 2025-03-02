import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchSection() {
  return (
    <>
      <Input className="w-52" type="text" placeholder="Введите запрос" />
      <Button className="hover:bg-slate-900 transition-colors duration-300 cursor-pointer" size="icon" variant="outline">
        <Search />
      </Button>
    </>
  );
}
