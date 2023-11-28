import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/Tables/ApplicationsList/DataTableColumnHeader.tsx';
import { appLinks } from '@/services/consts/Links.tsx';
import InsideFullSizeRedirector from '@/components/Navigators/InsideFullSizeRedirector.tsx';
import {
  ApplicationDetailType,
  ApplicantType,
} from '@/types/ApplicationTypes.ts';
import { getApplicationStatusColor } from '@/services/Helpers.tsx';

export const columns: ColumnDef<ApplicationDetailType>[] = [
  {
    accessorKey: 'id',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: 'status',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const currentApplication = row.original;
      const statusColor = getApplicationStatusColor(currentApplication.status);

      return (
        <div className="cursor-pointer hover:text-primary relative">
          <InsideFullSizeRedirector
            to={`${appLinks.adminApplicationDetail}${currentApplication.id}`}
          />
          <span className={`font-bold ${statusColor}`}>
            {currentApplication?.status.toUpperCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'applicant',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Full name' />
    ),
    cell: ({ row }) => {
      const currentApplication = row.original;
      const applicant: ApplicantType = row.getValue('applicant');
      const fullName = `${applicant?.last_name || ''} ${applicant?.first_name || ''
        } ${applicant?.patronymic || ''}`;
      return (
        <div className="cursor-pointer hover:text-primary relative">
          <InsideFullSizeRedirector
            to={`${appLinks.adminApplicationDetail}${currentApplication.id}`}
          />
          {fullName}
        </div>
      );
    },
  },
  {
    accessorKey: 'applicant.iin',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='IIN' />
    ),
    cell: ({ row }) => {
      const currentApplication = row.original;
      return (
        <div className="cursor-pointer hover:text-primary relative">
          <InsideFullSizeRedirector
            to={`${appLinks.adminApplicationDetail}${currentApplication.id}`}
          />
          {currentApplication.applicant?.iin || ''}
        </div>
      );
    },
  },
  {
    accessorKey: 'applicant.group.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Group' />
    ),
    cell: ({ row }) => {
      const currentApplication = row.original;
      return (
        <div className="cursor-pointer hover:text-primary relative">
          <InsideFullSizeRedirector
            to={`${appLinks.adminApplicationDetail}${currentApplication.id}`}
          />
          {currentApplication.applicant?.group?.name || ''}
        </div>
      );
    },
  },
  {
    accessorKey: 'applicant.course_number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Course' />
    ),
    cell: ({ row }) => {
      const currentApplication = row.original;
      return (
        <div className="cursor-pointer hover:text-primary relative">
          <InsideFullSizeRedirector
            to={`${appLinks.adminApplicationDetail}${currentApplication.id}`}
          />
          {currentApplication.course_number || ''}
        </div>
      );
    },
  },
  {
    accessorKey: 'gpa',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='GPA' />
    ),
    cell: ({ row }) => {
      const currentApplication = row.original;
      return (
        <div className="cursor-pointer hover:text-primary relative">
          <InsideFullSizeRedirector
            to={`${appLinks.adminApplicationDetail}${currentApplication.id}`}
          />
          {currentApplication.gpa || ''}
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => {
      const currentCategory: ApplicationDetailType['category'] =
        row.getValue('category');

      return (
        <>
          {currentCategory?.title}
        </>
      );
    },
  },
  {
    accessorKey: 'sent_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sent date' />
    ),
    cell: ({ row }) => {
      const sentDate = new Date(row.getValue('sent_date')).toLocaleDateString();
      return <>{sentDate}</>;
    },
  },
  {
    accessorKey: 'check_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check date' />
    ),
    cell: ({ row }) => {
      let checkDate = row.getValue('check_date');
      if (checkDate) {
        checkDate = new Date(row.getValue('check_date')).toLocaleDateString();
      }
      return <>{checkDate}</>;
    },
  },
];
