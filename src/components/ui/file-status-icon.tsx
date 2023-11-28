import { CheckCircledIcon, UpdateIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { documentsType } from '@/types/documentType.ts';
import { getFileStatusColor } from '@/services/Helpers.tsx';

type FileStatusIconProps = {
  status: documentsType['status'];
};

const FileStatusIcon = ({ status }: FileStatusIconProps) => {
  const { t } = useTranslation();
  const statusColor = getFileStatusColor(status);

  return (
    <div className="flex items-center justify-center rounded-md md:max-w-max:justify-self-start p-1 m-1">
      <span>{t('document status')}</span>
      <span className="flex ml-2">
        <span className={statusColor}>{t(status.toUpperCase())}</span>
        {status === 'approved' ? (
          <CheckCircledIcon className="m-1" />
        ) : (
          status === 'need_correction' && <UpdateIcon className="m-1" />
        )}
      </span>
    </div>
  );
};

export default FileStatusIcon;
