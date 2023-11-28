import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '@/services/Axios.tsx';
import DataTable from '@/components/Tables/ApplicationsList/DataTable.tsx';
import { columns } from '@/components/Tables/ApplicationsList/AdminColumns';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import LoadingIndicator from '@/components/ui/loading-indicator.tsx';
import { ApplicationDetailType } from '@/types/ApplicationTypes.ts';

const AdminApplicationsList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [applicationsList, setApplicationsList] = useState<ApplicationDetailType[] | null>(null);
  const [currentPage, setCurrentPage] = useState(new URLSearchParams(location.search).get('page') || 1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [isPreviousPage, setIsPreviousPage] = useState(false);

  useEffect(() => {
    axios
      .get('/applications/', { params: { page: currentPage } })
      .then((res) => {
        if (res.status === 200) {
          setApplicationsList(res.data.results);
          setIsNextPage(Boolean(res.data.next));
          setIsPreviousPage(Boolean(res.data.previous));
          navigate(`?page=${currentPage}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full min-h-[500px] h-full">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          {applicationsList ? (
            <DataTable
              columns={columns}
              setCurrentPage={setCurrentPage}
              isNextPage={isNextPage}
              isPreviousPage={isPreviousPage}
              data={applicationsList}
            />
          ) : (
            <LoadingIndicator fullWidth />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApplicationsList;
