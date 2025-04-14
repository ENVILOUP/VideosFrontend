import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { ISearchParams } from "../types/ISearch";

export default function SearchSection() {
  const [searchValue, setSearchValue] = useState('');

  const [searchParams, setSearchParams] = useState<ISearchParams>({
    query: '',
    page: 1,          
    page_size: 10     
  });

  const { data } = useSearch(searchParams);

  useEffect(() => {
    if (data) {
      console.log("Result:", data);
    }
  }, [data]);

  const handleSearch = () => {
    setSearchParams(prev => ({
      ...prev,
      query: searchValue.trim()  
    }));
  };

  return (
    <>
      <Input className="w-52" type="text" placeholder="Введите запрос" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
      <Button className="hover:bg-slate-900 transition-colors duration-300 cursor-pointer" size="icon" variant="outline" onClick={handleSearch}>
        <Search />
      </Button>
    </>
  );
}
