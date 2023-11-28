export type documentsType = {
  id: number;
  document_type: documentType;
  uploaded_file: string;
  status: 'altered' | 'approved' | 'not_checked' | 'need_correction';
  comment: string;
  application: number;
};

export type categoryType = {
  id: number;
  title: string;
  is_active: boolean;
};

export type documentType = {
  id: number;
  title: string;
  is_necessary?: boolean;
};
