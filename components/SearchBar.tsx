'use client'; // 必须是客户端组件

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // 这里的路径必须对应你的路由
      router.push(`/blog?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/blog');
    }
  };

  return (
    // 这里完全保留了你之前的居中布局样式
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search articles..." 
          className="pl-10 bg-background"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}