import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FileUp } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import LoadingIndicator from '@/components/ui/loading-indicator.tsx';
import {
  formDataApplicationMerger,
  ObjectStateSetter,
} from '@/services/Helpers.tsx';
import { AuthContext } from '@/store/AuthStore.tsx';
import axios from '@/services/Axios.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { documentType } from '@/types/documentType.ts';
import { appLinks } from '@/services/consts/Links.tsx';

const CreateApplication = () => {
  const { categoryNumber } = useParams();
  const { toast } = useToast();
  const user = useContext(AuthContext)?.user;
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<documentType[] | null>(null);
  const [files, setFiles] = useState({});
  const navigate = useNavigate();

  const addFile = (e: ChangeEvent<HTMLInputElement>, key: number) => {
    const file: File | undefined = e.target.files?.[0];

    ObjectStateSetter(setFiles, { [key]: file });
  };

  const createApplication = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(
        '/applications/create/',
        formDataApplicationMerger(documents, files, categoryNumber)
      )
      .then((res) => {
        if (res.status === 201) {
          toast({
            variant: 'success',
            title: "The application has been sent",
            description: `${user?.last_name} ${user?.first_name}, your application has been successfully created`,
          });

          navigate(appLinks.userApplicationList);
        }
      })
      .catch((err) => {
        console.error(err);

        if (err.response.status === 403) {
          toast({
            variant: 'error',
            title: "The application has not been sent",
            description:
              'You cannot apply more than once per semester in the selected mobility category'

          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(`applications/categories/${categoryNumber}/document-types/`)
      .then((res) => {
        if (res.status === 200) {
          const sortedData: documentType[] = res.data.sort(
            (document: documentType) => (document.is_necessary ? -1 : 1)
          );

          setDocuments(sortedData);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <form onSubmit={createApplication}>
          <CardHeader>
            <CardTitle className="text-lg text-center mb-2">
              Application form
            </CardTitle>
            <CardDescription className="max-w-lg text-center mx-auto mb-6">
              <span className="block">
                Fill in all fields with documents and submit the form
              </span>
              <span>
                <b>
                  You can attach a photo of the document or a scanned version of it
                </b>
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {documents &&
              documents.map((document) => (
                <div
                  className="grid w-full items-center gap-1 mb-10"
                  key={document.id}
                >
                  <Label
                    className="text-center"
                    htmlFor={`doc${categoryNumber}`}
                  >
                    {document?.title}
                    {document.is_necessary && (
                      <span className="text-red-700"> *</span>
                    )}
                  </Label>
                  <Input
                    required={document.is_necessary}
                    className="cursor-pointer"
                    id={`doc${categoryNumber}`}
                    type="file"
                    onChange={(e) => addFile(e, document.id)}
                  />
                </div>
              ))}

            <CardFooter className="mt-10">
              <Button
                variant={isLoading ? 'outline' : 'default'}
                disabled={isLoading || !documents?.length}
                className={`mx-auto ${isLoading && 'loading'}`}
                size="lg"
                type="submit"
              >
                {isLoading ? (
                  <LoadingIndicator inButton />
                ) : (
                  <FileUp className="mr-2" />
                )}
                {isLoading ? "sending..." : "submit"}
              </Button>
            </CardFooter>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default CreateApplication;
