import { useContext, useState } from 'react';
import { FileUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import InsideFullSizeLink from '@/components/Navigators/InsideFullSizeLink';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import FileStatusIcon from '@/components/ui/file-status-icon';
import { useToast } from '@/components/ui/use-toast.ts';
import { Input } from '@/components/ui/input';
import axios from '@/services/Axios';
import LoadingIndicator from '@/components/ui/loading-indicator';
import { documentsType } from '@/types/documentType.ts';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card.tsx';

type UserApplicationFileItemProps = {
  document: documentsType;
};

const UserApplicationFileItem = ({
  document,
}: UserApplicationFileItemProps) => {
  const [newFile, setNewFile] = useState(new Blob());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpdate = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('uploaded_document', newFile);
    formData.append('status', 'altered');

    axios
      .patch(`documents/update-uploaded-file/${document.id}/`, formData)
      .then((res) => {
        if (res.status === 200) {
          toast({
            variant: 'success',
            title: 'The application has been sent',
            description: 'The document has been successfully updated',
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          Open the document
        </Button>

        <div>
          <span>Comment to the document</span>
          <Textarea
            className="resize-none mb-3 mt-3"
            value={document.comment || 'no comments'}
            readOnly
          />
        </div>
        <div className="flex max-[590px]:flex-col justify-end gap-2">
          <Input
            required
            className="cursor-pointer max-w-max"
            type="file"
            onChange={(e) => {
              e.target.files && setNewFile(e.target?.files[0]);
            }}
          />

          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button
                variant={isLoading ? 'outline' : 'default'}
                disabled={document.status === 'approved' || !newFile}
                className={`${isLoading && 'loading'}`}
                onClick={handleFileUpdate}
              >
                {isLoading ? (
                  <LoadingIndicator inButton />
                ) : (
                  <FileUp className="mr-2" />
                )}
                {isLoading ? 'sending' : 'submit'}
              </Button>
            </HoverCardTrigger>
            {document.status === 'approved' ? (
              <HoverCardContent>
                <span>
                  You cannot send another document if the previous one is confirmed
                </span>
              </HoverCardContent>
            ) : (
              <></>
            )}
          </HoverCard>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserApplicationFileItem;
