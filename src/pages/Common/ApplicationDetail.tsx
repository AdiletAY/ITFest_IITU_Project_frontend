import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCheck } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card.tsx';
import AdminApplicationFileItem from '@/components/Files/AdminApplicationFileItem';
import { Button } from '@/components/ui/button.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card.tsx';
import { Label } from '@/components/ui/label.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import axios from '@/services/Axios.tsx';
import {
  handleFetchApplicationDataArgumentsType,
  handleFetchApplicationsData,
} from '@/services/API/handleFetchApplicationData.ts';
import { getApplicationDetail } from '@/services/API/getDataFromAPI.ts';
import { ApplicationDetailType } from '@/types/ApplicationTypes.ts';
import { getApplicationStatusColor } from '@/services/Helpers.tsx';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentApp, setCurrentApp] = useState<ApplicationDetailType | null>(
    null
  );
  const [currentComment, setCurrentComment] = useState<
    ApplicationDetailType['comment'] | undefined
  >(currentApp?.comment ? currentApp.comment : '');

  const isEveryDocumentApproved = currentApp?.documents.every(
    (document) => document.status === 'approved'
  );
  const isApplicationApproved = currentApp?.status === 'approved';

  const statusColor = getApplicationStatusColor(currentApp?.status);

  const handleApplication = (
    applicationId?: number,
    status?: 'approved' | 'rejected'
  ) => {
    const fetchParameters: handleFetchApplicationDataArgumentsType = {
      method: 'patch',
      url: `/applications/update/${applicationId}/`,
      data: {
        status: status,
        comment: currentComment,
      },
      toastData: {
        variant: status === 'approved' ? 'success' : 'error',
        title: `The application ${status === 'approved' ? 'approved' : 'rejected'}!`,
      },
      status: 200,
    };

    handleFetchApplicationsData(fetchParameters).then(() =>
      getApplicationDetail(applicationId, setCurrentApp)
    );
  };

  const handleApplyChanges = (applicationId?: number) => {
    axios
      .patch(`/ applications / update / ${applicationId}/`, {
        status: currentApp?.status,
        comment: currentComment,
      })
      .then((res) => {
        if (res.status === 200) {
          toast({
            variant: 'success',
            title: 'Changes accepted',
          });
        }

        navigate(-1);
      })
      .catch((err) => console.error(err));
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentComment(e.target.value);
  };

  useEffect(() => {
    if (!currentApp) getApplicationDetail(Number(id), setCurrentApp);
    setCurrentComment(currentApp?.comment);
  }, [currentApp]);

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
                application status
                <span className={`font-bold ${statusColor}`}>
                  ` ${currentApp?.status.toUpperCase()}`
                </span>
              </p>
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-center">
            <a
              className="text-primary"
              href={`mailto:${currentApp?.applicant?.email}`}
              target="_blank"
            >
              {currentApp?.applicant?.email}
            </a>
            <br />
            `IIN: ${currentApp?.applicant?.iin}`
            <br />
            `Group: ${currentApp?.applicant?.group?.name}`
            < br />
            `Course: ${currentApp?.applicant?.course_number}`
            <br />
            `GPA': ${currentApp?.applicant?.gpa}`

          </CardDescription>
        </CardContent>
      </Card>
      <Card className="w-full max-w-3xl mt-5 mb-20">
        <CardContent>
          <CardHeader className="text-center text-xl max-[426px]:text-lg">
            Documents
          </CardHeader>
          {currentApp?.documents.map((document) => (
            <AdminApplicationFileItem
              document={document}
              key={document.id}
              id={id}
              setCurrentApp={setCurrentApp}
              isApplicationApproved={isApplicationApproved}
            />
          ))}
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-10">
          <div className="w-full">
            <Label htmlFor="appComment" className="self-start text-md">
              Comment to the application
            </Label>
            <Textarea
              id="appComment"
              placeholder="Add a comment"
              className="my-3"
              value={currentComment || ''}
              onChange={(e) => handleCommentChange(e)}
            />
          </div>
          <div className="flex flex-row justify-center gap-x-10 max-[830px]:flex-col gap-y-5">
            <Button
              onClick={() => handleApplication(currentApp?.id, 'rejected')}
              variant="destructive"
            >
              Reject the application
            </Button>


            <Button
              onClick={() => handleApplication(currentApp?.id, 'approved')}
              disabled={!isEveryDocumentApproved || isApplicationApproved}
            >
              Approve the application
              <CheckCheck className="text-muted-foreground w-4 h-4 ms-2" />
            </Button>

            <Button onClick={() => handleApplyChanges(currentApp?.id)}>
              Save changes and return
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplicationDetail;
