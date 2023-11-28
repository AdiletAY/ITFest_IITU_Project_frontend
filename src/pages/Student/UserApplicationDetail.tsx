import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card.tsx';
import axios from '@/services/Axios';
import {
  getApplicationStatusColor,
  ObjectStateSetter,
} from '@/services/Helpers';
import UserApplicationFileItem from '@/components/Files/UserApplicationFileItem';
import { ApplicationDetailType } from '@/types/ApplicationTypes.ts';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Label } from '@/components/ui/label.tsx';

const UserApplicationDetail = () => {
  const { id } = useParams();
  const [currentApp, setCurrentApp] = useState<ApplicationDetailType | null>(
    null
  );
  const statusColor = getApplicationStatusColor(currentApp?.status);

  useEffect(() => {
    axios.get(`applications/detail/${id}/`).then((res) => {
      ObjectStateSetter(setCurrentApp, res.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-3xl">
        <CardContent>
          <CardHeader className="pt-5 pb-2">
            <CardTitle>
              <div className="text-center text-xl mb-6 max-[426px]:text-lg">
                {currentApp?.applicant?.first_name}{' '}
                {currentApp?.applicant?.last_name}{' '}
                {currentApp?.applicant?.patronymic}
              </div>
              <p className="text-center text-l">
                Status:{' '}
                <span className={`font-bold ${statusColor}`}>
                  {currentApp?.status.toUpperCase()}
                </span>
              </p>
            </CardTitle>
          </CardHeader>
        </CardContent>
      </Card>
      <Card className="w-full max-w-3xl mt-5 mb-20">
        <CardContent>
          <CardHeader className="text-center text-xl max-[426px]:text-lg">
            Documents
          </CardHeader>
          {currentApp?.documents.map((document) => (
            <UserApplicationFileItem document={document} key={document.id} />
          ))}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Label htmlFor="appComment" className="self-start ">
            Comment to the application
          </Label>
          <Textarea
            className="resize-none mb-3 mt-3"
            id="appComment"
            readOnly
            value={currentApp?.comment || 'no comments'}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserApplicationDetail;
