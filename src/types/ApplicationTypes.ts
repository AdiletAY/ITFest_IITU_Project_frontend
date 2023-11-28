import { categoryType, documentsType } from '@/types/documentType.ts';

export type ApplicantType = {
  id: number;
  group: {
    id: number;
    id_in_platonus: number;
    name: string;
  };
  faculty: {
    id: number;
    id_in_platonus: string;
    name_kz: string;
    name_en: string;
    name_ru: string;
  };
  cafedra: {
    id: number;
    id_in_platonus: number;
    name_ru: string;
    name_kz: string;
    name_en: string;
  };
  profession: {
    id: number;
    id_in_platonus: number;
    name_ru: string;
    name_kz: string;
    name_en: string;
    profession_code: string;
  };
  study_form: {
    id: number;
    id_in_platonus: number;
    name_ru: string;
    name_kz: string;
    name_en: string;
  };
  payment_form: {
    id: number;
    name_ru: string;
    name_kz: string;
    name_en: string;
  };
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
