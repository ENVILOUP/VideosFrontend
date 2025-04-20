import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { ISearchRequest } from "../types/ISearch";

import { useRouter } from "next/navigation";

export default function SearchSection() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const [searchParams, setSearchParams] = useState<ISearchRequest>({
    query: "",
    page: 1,
    page_size: 10,
  });

  const handleSearch = () => {
    setSearchParams((prev) => ({
      ...prev,
      query: searchValue.trim(),
    }));
  };

  return (
    <>
      <Input
        className="w-52"
        type="text"
        placeholder="Введите запрос"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button
        className="hover:bg-slate-900 transition-colors duration-300 cursor-pointer"
        size="icon"
        variant="outline"
        onClick={() => {
          handleSearch();
          router.push(
            `/search?query=${searchValue.trim()}&page=${searchParams.page}&page_size=${searchParams.page_size}`
          );
        }
        }
      >
        <Search />
      </Button>
    </>
  );
}
