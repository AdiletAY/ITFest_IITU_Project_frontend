import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  ApplicantType,
  ApplicationDetailType,
} from '@/types/ApplicationTypes.ts';
import { documentsType, documentType } from '@/types/documentType.ts';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function ObjectStateSetter<T>(
  setter: React.Dispatch<React.SetStateAction<T>>,
  object: T
) {
  setter((prevState: T) => ({
    ...prevState,
    ...object,
  }));
}

export function getFriendlyUserRole(
  role?: ApplicantType['role'],
): string | undefined {
  if (role?.toLowerCase() === 'student') {
    return 'Student'
  }
  if (role?.toLowerCase() === 'admin') {
    return 'Administrator'
  }
  if (role?.toLowerCase() === 'teacher') {
    return 'Teacher'
  }

  return role;
}

type filesType = {
  [key: number]: Blob;
};

export function formDataApplicationMerger(
  types: documentType[] | null,
  files: filesType,
  category?: string
): FormData {
  const formData = new FormData();
  const currentCategory = category || '';

  types?.forEach(({ id }) => {
    formData.append(String(id), files[id]);
  });
  formData.append('category', currentCategory);

  return formData;
}

// export function redirectToTelegramBot(): void {
//   window.open('https://t.me/shoqan_university_bot', '_blank');
// }

export const getApplicationStatusColor = (
  status?: ApplicationDetailType['status']
) => {
  const statusColor =
    status === 'sent'
      ? 'text-blue-500'
      : status === 'approved'
        ? 'text-green-600'
        : status === 'rejected'
          ? 'text-red-700'
          : status === 'need_correction'
            ? 'text-purple-700'
            : 'text-yellow-500';

  return statusColor;
};

export const getFileStatusColor = (status: documentsType['status']) => {
  const statusColor =
    status === 'not_checked'
      ? 'text-blue-500'
      : status === 'approved'
        ? 'text-green-600'
        : status === 'need_correction'
          ? 'text-purple-700'
          : 'text-fuchsia-400';

  return statusColor;
};
