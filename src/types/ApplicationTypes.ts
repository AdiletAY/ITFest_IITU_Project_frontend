import { categoryType, documentsType } from '@/types/documentType.ts';

export type ApplicantType = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  date_joined: string;
  id_in_platonus: number;
  email: string;
  patronymic: string;
  course_number: number;
  iin: string;
  gpa: number;
  role: 'admin' | 'student';
};

export type ApplicationDetailType = {
  id: number;
  applicant: ApplicantType;
  documents: documentsType[];
  status: 'sent' | 'approved' | 'rejected' | 'need_correction';
  course_number: number;
  gpa: number;
  sent_date: string;
  check_date: string | null;
  comment: string;
  category: categoryType;
};

export type userApplicationDetailType = Omit<
  ApplicationDetailType,
  'applicant'
>;

export type applicationsResponse = {
  count: number;
  next: boolean;
  previous: boolean;
  results: ApplicationDetailType[];
};
