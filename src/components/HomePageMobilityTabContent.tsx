import React from 'react';
import { listType } from '@/services/ListRenderData.tsx';

type HomePageMobilityTabContentProps = {
  content: listType[];
};

const HomePageMobilityTabContent = ({
  content,
}: HomePageMobilityTabContentProps) => {
  const displayContent = content ? content : [];

  return (
    <div>
      {displayContent.map(({ type, icon, title, description }, index) => (
        <React.Fragment key={title}>
          {type === 'alert' && (
            <div className="flex items-center space-x-4 rounded-md border p-4 my-5">
              {icon}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          )}
          {type === 'list' && (
            <div
              key={index}
              className="ms-4 mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default HomePageMobilityTabContent;
