import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { ISearchRequest } from "../types/ISearch";
import { useRouter } from "next/navigation";

export default function SearchSection() {
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useState<ISearchRequest>({
    query: "",
    page: 1,
    page_size: 10,
  });
  const searchLink = `/search?query=${searchValue.trim()}&page=${searchParams.page}&page_size=${searchParams.page_size}`;

  const router = useRouter();

  const handleSearch = () => {
    setSearchParams((prev) => ({
      ...prev,
      query: searchValue.trim(),
    }));
  };

  useEffect(() => {
    const searchParamValue = new URLSearchParams(window.location.search).get(
      "query"
    );
    if (searchParamValue) {
      setSearchValue(searchParamValue);
    }
  }, []);


  return (
    <>
      <Input
        className="w-52"
        type="text"
        placeholder="Введите запрос"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchValue) {
            handleSearch();
            router.push(searchLink);
          }
        }}
      />
      <Button
        className="hover:bg-slate-900 transition-colors duration-300 cursor-pointer"
        size="icon"
        variant="outline"
        onClick={() => {
          handleSearch();
          if (searchValue)
            router.push(searchLink);
        }
        }
      >
        <Search />
      </Button>
    </>
  );
}
