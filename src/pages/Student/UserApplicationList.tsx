import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingIndicator from '@/components/ui/loading-indicator';
import axios from '@/services/Axios';
import { UserApplicationsTable } from '@/components/Tables/UserApplicationsTable/UserApplicationsTable.tsx';
import { userApplicationDetailType } from '@/types/ApplicationTypes.ts';

const UserApplicationList = () => {
  const [applicationsData, setApplicationsData] = useState<
    userApplicationDetailType[] | null
  >(null);
  useEffect(() => {
    axios
      .get('applications/my/')
      .then((res) => {
        if (res.status === 200) {
          setApplicationsData(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full min-h-[500px] h-full">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            My applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {applicationsData ? (
            applicationsData.length === 0 ? (
              <div className="text-center mt-10 text-xl">
                You have no submitted applications
              </div>
            ) : (
              <UserApplicationsTable applicationsData={applicationsData} />
            )
          ) : (
            <LoadingIndicator fullWidth />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserApplicationList;
