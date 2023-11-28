type CustomListPropsType = {
  title: string;
  description?: string;
  className: string;
};

const CustomList = ({
  title = '',
  description = '',
  className,
}: CustomListPropsType) => {
  return (
    <div
      className={`mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 ${className}`}
    >
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
      <div className="space-y-1">
        <p className="text-lg font-medium leading-none">{title}</p>
        <p className="text-md text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default CustomList;
