import { useState, useEffect } from 'react';
import { fetchUsers, fetchFilteredUsers } from '../services/userService';
import { Result } from '../interfaces/RandomUser';

interface UseUsersProps {
  page: number;
  resultsPerPage: number;
  filters: { gender: string; nat: string };
}

export const useUsers = ({ page, resultsPerPage, filters }: UseUsersProps) => {
  const [data, setData] = useState<Result[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      let resultData;
      if (filters.gender || filters.nat) {
        resultData = await fetchFilteredUsers(filters.gender, filters.nat, resultsPerPage);
      } else {
        resultData = await fetchUsers(page, resultsPerPage);
      }
      setData(resultData.results);
      setTotalPages(Math.ceil(5000 / resultsPerPage));
      setIsLoading(false);
    };

    loadData();
  }, [page, resultsPerPage, filters]);

  return { data, totalPages, isLoading };
};
