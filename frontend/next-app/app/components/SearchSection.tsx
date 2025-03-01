import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchSection() {
  return (
    <>
      <Input className="w-52" type="text" placeholder="Введите запрос" />
      <Button size="icon" variant="outline">
        <Search />
      </Button>
    </>
  );
}
