import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import CustomList from '@/components/ui/custom-list.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card.tsx';
import { GetMyProfileList } from '@/services/ListRenderData.tsx';
import { AuthContext } from '@/store/AuthStore.tsx';

const MyProfile = () => {
  const user = useContext(AuthContext)?.user;
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[100%] max-w-2xl">
        <CardHeader>
          <CardDescription className="text-center text-xs">
            {user?.role}
          </CardDescription>
          <CardTitle className="text-center text-2xl">
            {user?.last_name} {user?.first_name} {user?.patronymic}
          </CardTitle>
          {user?.iin && (
            <CardDescription className="text-center text-xs">
              'uin': {user?.iin}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div>
            {GetMyProfileList().list.map(({ title, description, isRender }) => (
              <React.Fragment key={title}>
                {isRender && (
                  <CustomList
                    title={title}
                    description={description}
                    className="ms-10"
                  />
                )}
              </React.Fragment>
            ))}
            {GetMyProfileList().emptyList.map(
              ({ title, description }, index) => (
                <div key={title + index} className="w-full mx-auto">
                  <h1 className="text-center text-2xl w-full">{title}</h1>
                  <p className="text-center">{description}</p>
                </div>
              )
            )}
          </div>

          {user?.gpa && (
            <HoverCard>
              <HoverCardTrigger asChild className="mt-10">
                <div className="cursor-help">
                  <p className="text-center w-full text-xl font-semibold select-none animate-bounce">
                    'gpa': {user?.gpa}
                  </p>
                  <Progress
                    id="GPA"
                    value={user?.gpa * 25}
                    className="animate-pulse"
                  />
                </div>
              </HoverCardTrigger>
            </HoverCard>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfile;
