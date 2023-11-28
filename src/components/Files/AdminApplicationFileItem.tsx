import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { CheckCircledIcon, UpdateIcon } from '@radix-ui/react-icons';
import { useToast } from '@/components/ui/use-toast.ts';
import FileStatusIcon from '@/components/ui/file-status-icon';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import axios from '@/services/Axios';
import InsideFullSizeLink from '../Navigators/InsideFullSizeLink';
import { getApplicationDetail } from '@/services/API/getDataFromAPI.ts';
import { ApplicationDetailType } from '@/types/ApplicationTypes.ts';
import { documentsType } from '@/types/documentType.ts';

type AdminApplicationFileItemProps = {
  document: documentsType;
  id?: string;
  setCurrentApp: Dispatch<SetStateAction<ApplicationDetailType | null>>;
  isApplicationApproved: boolean;
};

export type fileDetailsType = {
  status: documentsType['status'];
  comment: ApplicationDetailType['comment'];
};

const AdminApplicationFileItem = ({
  document,
  id,
  setCurrentApp,
  isApplicationApproved,
}: AdminApplicationFileItemProps) => {
  const fileDetailsInitialState = {
    status: document.status,
    comment: document.comment,
  };

  const [, setFileDetails] = useState<fileDetailsType>(fileDetailsInitialState);
  const { toast } = useToast();
  const [currentComment, setCurrentComment] = useState(
    document?.comment ? document?.comment : ''
  );

  const handleFileStatusChanging = (fileDetailData: fileDetailsType) => {
    setFileDetails((prevState) => ({ ...prevState, ...fileDetailData }));

    axios
      .patch(`documents/update-status/${document.id}/`, fileDetailData)
      .then((res) => {
        if (res.status === 200) {
          toast({
            variant: 'success',
            title: 'Document has been successfully updated',
            description:
              `The status has been changed to ${res.data.status}`,
          });
        }
        getApplicationDetail(Number(id), setCurrentApp);
      })
      .catch((err) => {
        toast({
          variant: 'error',
          title: 'Error',
          description: `${err.code}`,
        });
      });
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentComment(e.target.value);
  };

  return (
    <Card className="w-full mb-10">
      <CardHeader className="md:flex-column m-0 p-0">
        <h3 className="grow text-center text-xl p-1 m-0 max-[426px]:text-lg">
          {document?.document_type?.title}
        </h3>
        <FileStatusIcon status={document.status} />
      </CardHeader>

      <CardContent className="m-0 px-5 pt-2">
        <Button variant="outline" className="w-full relative mb-6">
          <InsideFullSizeLink blank={true} to={document.uploaded_file} />
          Open the doc
        </Button>

        <div>
          <span>Comment to the document</span>
          <Textarea
            className="resize-none mb-3 mt-3"
            value={currentComment}
            placeholder='Add a comment'
            onChange={(e) => handleCommentChange(e)}
          />
        </div>

        <div className="flex max-[590px]:flex-col justify-end gap-2 ">
          <Button
            onClick={() =>
              handleFileStatusChanging({
                status: 'need_correction',
                comment: currentComment,
              })
            }
            disabled={
              document.status === 'need_correction' || isApplicationApproved
            }
          >
            <UpdateIcon className="m-1" />
            For adjustment
          </Button>

          <Button
            onClick={() =>
              handleFileStatusChanging({
                status: 'approved',
                comment: currentComment,
              })
            }
            disabled={document.status === 'approved' || isApplicationApproved}
          >
            <CheckCircledIcon className="m-1" />
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminApplicationFileItem;
