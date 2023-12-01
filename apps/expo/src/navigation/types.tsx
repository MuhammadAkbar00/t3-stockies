export type BottomTabParamList = {
  Home: { screen: string; params?: {} };
  Company: { screen: string; params?: { companyId?: number } };
  Article: { screen: string; params?: { articleId?: string } };
  Profile: { screen: string; params?: {} };
};

export type HomeStackParamList = {
  Menu: undefined;
};

export type CompanyStackParamList = {
  CompanyHome: undefined;
  CompanyDetails: { companyId: number | null };
};

export type ArticleStackParamList = {
  ArticleHome: undefined;
  ArticleDetails: { articleId: string | null };
};
