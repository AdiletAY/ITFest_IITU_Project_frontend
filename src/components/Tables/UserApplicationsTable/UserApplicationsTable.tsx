import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import { Button } from '@/components/ui/button.tsx';
import { appLinks } from '@/services/consts/Links.tsx';
import { Link } from 'react-router-dom';
import { userApplicationDetailType } from '@/types/ApplicationTypes.ts';
import { getApplicationStatusColor } from '@/services/Helpers.tsx';

type userApplicationsTableProps = {
  applicationsData: userApplicationDetailType[];
};

export const UserApplicationsTable = ({
  applicationsData,
}: userApplicationsTableProps) => {

  return (
    <Table className="w-full max-[425px]:w-[350px] max-[375px]:w-[280px]">
      <TableCaption>Applications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">{''}</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Category</TableHead>
          <TableHead className="text-center">Sent date</TableHead>
          <TableHead className="text-center">Check date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicationsData ? (
          applicationsData?.map(
            ({ id, status, category, sent_date, check_date }) => {
              const statusColor = getApplicationStatusColor(status);

              return (
                <TableRow key={id} className="text-center">
                  <TableCell>
                    <Link to={`${appLinks.userApplicationDetail}${id}`}>
                      <Button variant="outline">
                        View the application
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className={`font-bold ${statusColor}`}>
                    {status.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    {category?.title}
                  </TableCell>
                  <TableCell>{new Date(sent_date).toLocaleString()}</TableCell>
                  <TableCell>
                    {check_date ? new Date(check_date).toLocaleString() : ''}
                  </TableCell>
                </TableRow>
              );
            }
          )
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-lg">
              There are no documents added
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
